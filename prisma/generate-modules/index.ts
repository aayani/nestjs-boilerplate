import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import * as pluralize from 'pluralize'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'
;(async () => {
  const prisma = new PrismaClient()

  const [moduleTemplate, serviceTemplate] = await Promise.all([
    promisify(fs.readFile)(path.resolve(__dirname, 'module.template')).then(
      (t) => t.toString(),
    ),
    promisify(fs.readFile)(path.resolve(__dirname, 'service.template')).then(
      (t) => t.toString(),
    ),
  ])

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

        if (fs.existsSync(modulePath)) {
          console.log(`${modulePath} already exists. Skipping...`)
        } else {
          console.log(`$ yarn nest generate module ${model}`)
          execSync(`yarn nest generate module ${model}`)
        }

        if (fs.existsSync(servicePath)) {
          console.log(`${servicePath} already exists. Skipping...`)
        } else {
          console.log(`$ yarn nest generate service ${model}`)
          execSync(`yarn nest generate service ${model}`)

          const title = `${model[0].toUpperCase()}${model.slice(1)}`

          await Promise.all([
            promisify(fs.writeFile)(
              modulePath,
              moduleTemplate
                .replace('{{model}}', model)
                .replace('{{module}}', `${title}Module`)
                .replace(new RegExp('{{service}}', 'g'), `${title}Service`),
            ),
            promisify(fs.writeFile)(
              servicePath,
              serviceTemplate
                .replace('{{service}}', `${title}Service`)
                .replace(new RegExp('{{model}}', 'g'), model),
            ),
          ])
        }
      }

      break
    }
  }
})()
