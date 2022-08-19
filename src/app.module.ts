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
import { getMongoDbConfig } from './../config/mongo.config'

import { UserModel } from './user/user.model'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
    }),

    ServeStaticModule.forRoot({
      rootPath: resolve('../../../app/app-next/client/out'), //нужно для докера  выйти до app
      exclude: ['/api*'],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    AuthModule,
    UserModule,
    WordsModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
