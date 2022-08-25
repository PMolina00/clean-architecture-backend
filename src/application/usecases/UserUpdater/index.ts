import { UserToUpdate } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: UserToUpdate): Promise<UserToUpdate> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate: UserToUpdate = {
      id: data.id,
      name: data.name ?? user.name,
      username: data.username ?? user.username,
      age: data.age ?? user.age
    }

    const userUpdated: UserToUpdate = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
