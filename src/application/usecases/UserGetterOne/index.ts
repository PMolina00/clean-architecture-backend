import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class UserGetterOneUseCase {
  private readonly _useRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._useRepository = userRepository
  }

  async run (id: string): Promise<User | null> {
    const user: User | null = await this._useRepository.getById(id)
    return user
  }
}
