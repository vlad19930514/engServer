import { getMongoDbConfig } from './../config/mongo.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { WordsModule } from './words/words.module'
import { ListModule } from './list/list.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { resolve } from 'path'

import { GoogleAuthStrategy } from './google-auth/services/passport'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('../../app-next/client/out'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    WordsModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleAuthStrategy],
})
export class AppModule {}
