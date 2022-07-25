import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'

import { WordsModel } from 'src/words/words.model'

export interface ListModel extends Base {}
export class ListModel {
  @prop()
  listName: string
  @prop()
  words?: WordsModel[]
}
