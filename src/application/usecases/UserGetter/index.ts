import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class UserGetterUseCase {
  private readonly _useRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._useRepository = userRepository
  }

  async run (): Promise<User[]> {
    const users: User[] = await this._useRepository.getAll()
    return users
  }
}
