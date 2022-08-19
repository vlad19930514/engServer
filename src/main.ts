import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const port = process.env.port
  console.log(port)
  if (port) {
    await app.listen(port)
  } else {
    await app.listen(5000, '127.0.0.1')
  }
}
bootstrap()
/* 
, {
  exclude: ['/google/redirect', '/google'],
} */
