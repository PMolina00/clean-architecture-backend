import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { jwtManagement } from '../../../domain/utils/jwtManagement'

export class AuthUseCase {
  private readonly _userRepository: UserRepository
  private readonly _jwtManagement: jwtManagement

  constructor (userRepository: UserRepository, jwtManagement: jwtManagement) {
    this._userRepository = userRepository
    this._jwtManagement = jwtManagement
  }

  async run (token: string): Promise<User> {
    const user = await this._jwtManagement.compareJwt(token)
    const userData = await this._userRepository.getByUserName(user.username)

    if (userData === null) {
      throw new Error('Error in database User')
    }

    return userData
  }
}
