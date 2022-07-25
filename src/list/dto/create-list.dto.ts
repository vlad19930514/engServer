import { IsString } from 'class-validator'
import { IWord } from 'src/words/interfaces/words.interface'

export class CreateListDto {
  @IsString()
  listName: string

  words?: Array<IWord>
}
