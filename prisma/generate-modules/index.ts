import * as fs from 'fs'
import * as path from 'path'
import * as pluralize from 'pluralize'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const writeFile = (file: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) =>
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err)
      }

      resolve()
    }),
  )
}

;(async () => {
  const prisma = new PrismaClient()
  const template = fs
    .readFileSync(path.resolve(__dirname, 'service.template'))
    .toString()

  for (const [key, value] of Object.entries(prisma)) {
    if (key === '_dmmf') {
      if (value.datamodel.models.length === 0) {
        throw new Error(
          'No models found in prisma/schema.prisma. Either pull models from an existing database or define new ones.',
        )
      }

      for (const { name } of value.datamodel.models) {
        const model = pluralize(name).toLowerCase()

        const modulePath = path.resolve('src', model, `${model}.module.ts`)
        const servicePath = path.resolve('src', model, `${model}.service.ts`)

        if (!fs.existsSync(modulePath)) {
          console.log(`$ yarn nest generate module ${model}`)
          execSync(`yarn nest generate module ${model}`)
        }

        if (!fs.existsSync(servicePath)) {
          console.log(`$ yarn nest generate service ${model}`)
          execSync(`yarn nest generate service ${model}`)

          const moduleData = fs
            .readFileSync(modulePath)
            .toString()
            .replace(']', ', PrismaService]')
            .replace(
              ".service'",
              ".service'\nimport { PrismaService } from '../prisma/prisma.service'",
            )
          const serviceData = template
            .replace(new RegExp('{{model}}', 'g'), model)
            .replace(
              new RegExp('{{service}}', 'g'),
              `${model[0].toUpperCase()}${model.slice(1)}Service`,
            )

          await Promise.all([
            writeFile(modulePath, moduleData),
            writeFile(servicePath, serviceData),
          ])
        }
      }

      break
    }
  }
})()
