import { IWord } from 'src/words/interfaces/words.interface'

export interface IList {
  listName: string
  words?: Array<IWord>
}
