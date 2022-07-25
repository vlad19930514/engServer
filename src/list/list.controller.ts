import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { ListService } from './list.service'
import { Types } from 'mongoose'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}
  @Post('/create')
  @HttpCode(200)
  @Auth()
  async createList(
    @User('_id') id: Types.ObjectId,
    @Body() dto: CreateListDto
  ) {
    return this.listService.createList(id, dto)
  }

  @Post('/update')
  @HttpCode(200)
  @Auth()
  async updateList(
    @User('_id') id: Types.ObjectId,
    @Body() dto: UpdateListDto
  ) {
    return this.listService.updateList(id, dto)
  }

  @Post('/delete')
  @HttpCode(200)
  @Auth()
  async deleteList(
    @User('_id') id: Types.ObjectId,
    @Body() dto: UpdateListDto
  ) {
    return this.listService.deleteList(id, dto)
  }
}
