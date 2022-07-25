import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface WordsModel extends Base {}
export class WordsModel {
  @prop()
  word: string

  @prop()
  translate: string

  @prop()
  transcription: string
}
