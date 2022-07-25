import { WordsModule } from './../words/words.module'
import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from 'src/user/user.module'
import { ListController } from './list.controller'
import { ListModel } from './list.model'
import { ListService } from './list.service'
@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ListModel,
        schemaOptions: {
          collection: 'List',
        },
      },
    ]),
    UserModule,
  ],
  exports: [ListService],
})
export class ListModule {}
