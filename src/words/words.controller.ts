import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { User } from 'src/user/decorators/user.decorator'
import { CreateWordsDto } from './dto/create-words.dto'
import { Types } from 'mongoose'
import { WordsService } from './words.service'
import { DeleteWordsDto } from './dto/delete-words.dto'
import { UpdateWordsDto } from './dto/update-words.dto'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post('create')
  @HttpCode(200)
  @Auth()
  async create(@User('_id') id: Types.ObjectId, @Body() dto: CreateWordsDto) {
    return this.wordsService.create(id, dto)
  }
  @Post('delete')
  @HttpCode(200)
  @Auth()
  async delete(@User('_id') id: Types.ObjectId, @Body() dto: DeleteWordsDto) {
    return this.wordsService.delete(id, dto)
  }
  @Post('update')
  @HttpCode(200)
  @Auth()
  async update(@User('_id') id: Types.ObjectId, @Body() dto: UpdateWordsDto) {
    return this.wordsService.update(id, dto)
  }
}
