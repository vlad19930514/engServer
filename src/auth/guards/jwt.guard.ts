import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {}
export class GoogleAuthGuard extends AuthGuard('google') {}
