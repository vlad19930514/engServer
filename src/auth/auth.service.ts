import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash, compare } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { RefreshTokenDto } from './dto/refreshToken.dto'

import { AuthDto, GoogleAuthDto } from './dto/auth.dto'
import { UserModel } from '../user/user.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: AuthDto) {
    const user = await this.validateUser(email, password)

    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }
  async googleLogin({ email }: GoogleAuthDto) {
    const user = await this.validateGoogleUser(email)

    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in!')

    const result = await this.jwtService.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid token or expired!')

    const user = await this.UserModel.findById(result._id)

    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }
  //Нужно сделать обработку на совпадение email
  async register({ email, password }: AuthDto) {
    const salt = await genSalt(10)
    const newUser = new this.UserModel({
      email,
      password: await hash(password, salt),
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
    const user = await newUser.save()

    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async findByEmail(email: string) {
    return this.UserModel.findOne({ email }).exec()
  }

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.findByEmail(email)
    if (!user) throw new UnauthorizedException('User not found')

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) throw new UnauthorizedException('Invalid password')

    return user
  }
  async validateGoogleUser(email: string): Promise<UserModel> {
    const user = await this.findByEmail(email)
    if (!user) throw new UnauthorizedException('User not found')
    //еще нужно сделать если уже есть mail
    /*  const isValidId = googleId == user.googleId

    if (!isValidId) throw new UnauthorizedException('Invalid password') */

    return user
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId }

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15000d',
    })

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    return { refreshToken, accessToken }
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
      isAdmin: user.isAdmin,
      List: user.List,
    }
  }
}
