import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService: PrismaService = app.get(PrismaService)

  prismaService.enableShutdownHooks(app)

  const config = app.get(ConfigService)

  app.setGlobalPrefix('api')
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build(),
    ),
  )

  await app.listen(config.port)
  Logger.log(
    `API running at http://localhost:${config.port} in "${config.env}" mode`,
    'Main',
  )
}
bootstrap()
