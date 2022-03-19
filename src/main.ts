import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { PrismaService } from './prisma/prisma.service'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)
  const prismaService: PrismaService = app.get(PrismaService)

  prismaService.enableShutdownHooks(app)

  const config = app.get(ConfigService)

  if (config.globalApiPrefix) {
    app.setGlobalPrefix(config.globalApiPrefix)
  }

  SwaggerModule.setup(
    config.apiDocsUrl,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(config.appInfo.name)
        .setVersion(config.appInfo.version)
        .setDescription(config.appInfo.description)
        .build(),
    ),
  )

  const kafkaConsumer =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: { client: config.kafka },
    })

  await Promise.all([app.listen(config.port), kafkaConsumer.listen()])

  Logger.log(config.startupMessage, 'Main')
}

bootstrap()
