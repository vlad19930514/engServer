import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { ListModel } from 'src/list/list.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string

  @prop()
  password: string

  @prop({ default: false })
  isAdmin?: boolean
  @prop()
  List?: ListModel[]
}
