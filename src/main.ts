import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const PORT =
    process.env.NODE_ENV === 'production'
      ? app.listen(81)
      : app.listen(5000, '127.0.0.1')

  await PORT
}
bootstrap()
