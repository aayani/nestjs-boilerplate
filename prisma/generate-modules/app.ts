import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

import { Module } from './module'

const getTemplate = (name: string): Promise<string> => {
  return promisify(fs.readFile)(
    path.resolve(__dirname, 'templates', `${name}.template`),
  ).then((t) => t.toString())
}

export const bootstrap = async () => {
  const prisma = new PrismaClient()

  const [moduleTemplate, serviceTemplate] = await Promise.all([
    getTemplate('module'),
    getTemplate('service'),
  ])

  if (prisma['_dmmf'].datamodel.models.length === 0) {
    throw new Error(
      'No models found in prisma/schema.prisma. Either pull models from an existing database or define new ones.',
    )
  }

  for (const { name } of prisma['_dmmf'].datamodel.models) {
    const { folderName, serviceName, moduleName, modulePath, servicePath } =
      new Module(name)

    if (fs.existsSync(modulePath)) {
      console.log(`${modulePath} already exists. Skipping...`)
    } else {
      console.log(`$ yarn nest generate module ${folderName}`)
      execSync(`yarn nest generate module ${folderName}`)
    }

    if (fs.existsSync(servicePath)) {
      console.log(`${servicePath} already exists. Skipping...`)
      continue
    }

    console.log(`$ yarn nest generate service ${folderName}`)
    execSync(`yarn nest generate service ${folderName}`)

    await Promise.all([
      promisify(fs.writeFile)(
        servicePath,
        serviceTemplate
          .replace(/{{model}}/g, name)
          .replace('{{service}}', serviceName),
      ),
      promisify(fs.writeFile)(
        modulePath,
        moduleTemplate
          .replace('{{model}}', folderName)
          .replace('{{module}}', moduleName)
          .replace(/{{service}}/g, serviceName),
      ),
    ])
  }
}
