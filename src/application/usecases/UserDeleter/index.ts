import { UserToDelete } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export class UserDeleteUseCase {
  private readonly _useRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._useRepository = userRepository
  }

  async run (body: UserToDelete): Promise<UserToDelete> {
    const user: UserToDelete = await this._useRepository.delete(body)
    return user
  }
}
