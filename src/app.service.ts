import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user/user.model'
import { AuthService } from './auth/auth.service'
@Injectable()
export class AppService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    /*     const tokens = await this.issueTokenPair(String(req.user._id)) */
    return {
      message: 'User information from google',
      user: this.returnUserFields(req.user),
      /*      ...tokens, */
    }
  }

  /* async issueTokenPair(userId: string) {
    const data = { _id: userId }

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15000d',
    })

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    return { refreshToken, accessToken }
  }
 */
  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      List: user.List,
    }
  }
}
