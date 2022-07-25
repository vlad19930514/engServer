import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserService } from 'src/user/user.service'
import { CreateWordsDto } from './dto/create-words.dto'
import { DeleteWordsDto } from './dto/delete-words.dto'
import { UpdateWordsDto } from './dto/update-words.dto'
import { WordsModel } from './words.model'

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(WordsModel)
    private readonly wordsModel: ModelType<WordsModel>,
    private readonly userService: UserService
  ) {}

  async create(id, { listId, transcription, translate, word }: CreateWordsDto) {
    const newWord = new this.wordsModel({
      transcription: transcription,
      translate: translate,
      word: word,
    })
    const user = await this.userService.byId(id)
    const index = user.List.findIndex((elem) => elem._id == listId)
    user.List[index].words.push(newWord)
    user.markModified('List')
    user.save()
  }
  async delete(id, { wordId, listId }: DeleteWordsDto) {
    const user = await this.userService.byId(id)
    const index = user.List.findIndex((elem) => elem._id == listId)
    const foundWord = user.List[index].words.findIndex(
      (elem) => elem._id == wordId
    )
    user.List[index].words.splice(foundWord, 1)
    user.markModified('List')
    user.save()
  }
  async update(
    id,
    { wordId, listId, transcription, translate, word }: UpdateWordsDto
  ) {
    const user = await this.userService.byId(id)
    const index = user.List.findIndex((elem) => elem._id == listId)
    const foundWord = user.List[index].words.findIndex(
      (elem) => elem._id == wordId
    )
    const newWord = user.List[index].words[foundWord]
    newWord.transcription = transcription
    newWord.translate = translate
    newWord.word = word
    user.markModified('List')
    user.save()
  }
}
