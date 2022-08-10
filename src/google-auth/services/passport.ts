import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { config } from 'dotenv'
import { UserModel } from '../../user/user.model'
config()
@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'google/redirect',
      scope: ['email', 'profile'],
    })
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    console.log(profile)
    console.log(profile._json.name)
    console.log(profile._json.email)
    const existingUser = await this.UserModel.findOne({ googleId: profile.id })

    if (existingUser) {
      //we already have a record
      done(null, existingUser) // nothing to do
    } else {
      //we don't have
      new this.UserModel({
        googleId: profile.id,
        name: profile._json.name,
        email: profile._json.email,
      })
        .save()
        .then((user) => done(null, user))
    }
  }
}
