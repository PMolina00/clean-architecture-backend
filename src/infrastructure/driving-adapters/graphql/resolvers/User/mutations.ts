import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'
import { UuidV4Generator } from '../../../../utils/uuidV4Generator'
import { PasswordEncrypt } from '../../../../utils/encryptPassword'
import { HandlerError } from '../../utils/HandlerError'
import { UserUpdaterUseCase } from '../../../../../application/usecases/UserUpdater'

const userMutations = {
  createUser: async (_: any, args: any) => {
    const {
      user: {
        name,
        username,
        age,
        email,
        password
      }
    } = args

    const dbRepository = new MongoRepository()
    const uuidV4Generator = new UuidV4Generator()
    const passwordEncrypt = new PasswordEncrypt()
    const userCreateUseCase = new UserCreatorUseCase(dbRepository, uuidV4Generator, passwordEncrypt)
    const userToCreate = {
      name,
      username,
      age,
      email,
      password
    }

    try {
      const userCreated = await userCreateUseCase.run(userToCreate)
      return userCreated
    } catch (e) {
      return HandlerError.run(e)
    }
  },
  updateUser: async (_: any, args: any) => {
    const {
      user: {
        id,
        name,
        username,
        age,
        email,
        password
      }
    } = args
    const dbRepository = new MongoRepository()
    const userUpdateUseCase = new UserUpdaterUseCase(dbRepository)

    const userToUpdate = {
      id,
      name,
      username,
      age,
      email,
      password
    }

    try {
      const userUpdated = await userUpdateUseCase.run(userToUpdate)
      return userUpdated
    } catch (e) {
      return HandlerError.run(e)
    }
  }
}

export default userMutations
