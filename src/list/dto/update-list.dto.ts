import { IsString } from 'class-validator'
import { IWord } from 'src/words/interfaces/words.interface'

export class UpdateListDto {
  @IsString()
  listId: string
  @IsString()
  listName: string

  words?: Array<IWord>
}
