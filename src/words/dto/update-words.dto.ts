import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class UpdateWordsDto {
  @IsString()
  listId: Types.ObjectId

  @IsString()
  wordId: Types.ObjectId

  @IsString()
  word: string

  @IsString()
  translate: string

  @IsString()
  transcription: string
}
