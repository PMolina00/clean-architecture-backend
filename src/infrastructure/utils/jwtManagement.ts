import { LogInRes, User } from '../../domain/entities/User'
import { jwtManagement } from '../../domain/utils/jwtManagement'
import jwt from 'jsonwebtoken'

export class JwtManagement implements jwtManagement {
  async generate (user: User): Promise<LogInRes> {
    const logInRes = {
      token: jwt.sign({
        data: user
      }, 'secret', { expiresIn: '1h' })
    }
    return logInRes
  }

  async compareJwt (token: string): Promise<User> {
    const decoded: any = jwt.verify(token, 'secret')
    return decoded.data
  }
}
