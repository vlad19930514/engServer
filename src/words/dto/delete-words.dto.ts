import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class DeleteWordsDto {
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
