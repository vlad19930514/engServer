import { JwtStrategy } from './strategies/jwt.strategy'
import { getJWTConfig } from './../../config/jwt.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModel } from 'src/user/user.model'
import { JwtModule } from '@nestjs/jwt'
import { GoogleAuthStrategy } from 'src/google-auth/services/passport'

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleAuthStrategy],
})
export class AuthModule {}
