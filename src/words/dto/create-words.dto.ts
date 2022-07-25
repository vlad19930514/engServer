import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class CreateWordsDto {
  @IsString()
  listId: Types.ObjectId
  @IsString()
  word: string

  @IsString()
  translate: string

  @IsString()
  transcription: string
}
