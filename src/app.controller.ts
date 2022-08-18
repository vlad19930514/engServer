import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*   @Get()
  getHello() {
    return this.appService.getHello()
  } */

  /* @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('user')
  async user(@Req() req) {
    console.log(req)
    return this.AuthService.googleLogin(req)
  }

  @Get('redirect')
  @Redirect('http://localhost:3000/auth')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    console.log(123) // передать аксес токет, рефреш и юзера
    res.redirect('http://localhost:3000/auth/' + req.user)
  } */
}
