import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import mongoose from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UserService } from 'src/user/user.service'
import { ListModel } from './list.model'

@Injectable()
export class ListService {
  constructor(
    @InjectModel(ListModel)
    private readonly listModel: ModelType<ListModel>,
    private readonly userService: UserService
  ) {}

  async createList(id, { listName }) {
    const user = await this.userService.byId(id)
    const list = new this.listModel({
      listName: listName,
      words: [],
    })
    user.List.push(list)
    await user.save()
  }

  async updateList(id, { listName, listId }) {
    const user = await this.userService.byId(id)
    const index = user.List.findIndex((elem) => elem._id == listId)
    user.List[index].listName = listName
    user.markModified('List')
    user.save()
  }
  async deleteList(id, { listId }) {
    const user = await this.userService.byId(id)
    const index = user.List.findIndex((elem) => elem._id == listId)
    user.List.splice(index, 1)
    user.save()
  }
}
