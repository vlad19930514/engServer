import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from 'src/user/user.module'
import { WordsController } from './words.controller'
import { WordsModel } from './words.model'
import { WordsService } from './words.service'

@Module({
  controllers: [WordsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: WordsModel,
        schemaOptions: {
          collection: 'words',
        },
      },
    ]),
    UserModule,
  ],

  providers: [WordsService],
})
export class WordsModule {}
