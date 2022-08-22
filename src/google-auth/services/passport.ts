import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { config } from 'dotenv'
import { UserModel } from '../../user/user.model'
import { genSalt, hash } from 'bcryptjs'
config()
@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {
    super({
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.url + '/api/auth/google/redirect',
      scope: ['email', 'profile'],
    })
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const salt = await genSalt(10)

    const existingUser = await this.UserModel.findOne({
      email: profile._json.email,
    })
    if (existingUser) {
      //we already have a record
      done(null, existingUser) // nothing to do
    } else {
      //we don't have
      new this.UserModel({
        googleId: await hash(profile.id, salt),
        name: profile._json.name,
        email: profile._json.email,
        given_name: profile._json.given_name,
        family_name: profile._json.family_name,
        picture: profile._json.picture,
        List: [
          {
            listName: 'Основной список',
            words: [],
            _id: 'mainList',
          },
          {
            listName: 'Повтор раз в неделю',
            words: [],
            _id: 'weekList',
          },
          {
            listName: 'Повтор раз в месяц',
            words: [],
            _id: 'monthList',
          },
        ],
      })
        .save()
        .then((user) => done(null, user))
    }
  }
}
