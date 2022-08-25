import { LogInReq, LogInRes } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { encrypt } from '../../../domain/utils/encrypt'
import { jwtManagement } from '../../../domain/utils/jwtManagement'

export class AuthLoginUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userAuth: encrypt
  private readonly _jwtManagement: jwtManagement

  constructor (userRepository: UserRepository, userAuth: encrypt, jwtManagement: jwtManagement) {
    this._userRepository = userRepository
    this._userAuth = userAuth
    this._jwtManagement = jwtManagement
  }

  async run (user: LogInReq): Promise<LogInRes> {
    const userData = await this._userRepository.getByUserName(user.userName)
    if (userData === null || await this._userAuth.comparePassword(userData.password, user.password)) {
      throw new Error('user or password incorrect')
    }
    const logInRes = await this._jwtManagement.generate(userData)

    return logInRes
  }
}
