import { UserGetterUseCase } from '../../../../../application/usecases/UserGetter'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'
import { HandlerError } from '../../utils/HandlerError'

const userQueries = {
  user: async (_: any, args: any) => {
    const dbRepository = new MongoRepository()
    const userGetter = new UserGetterUseCase(dbRepository)

    try {
      const users = await userGetter.run()
      return users
    } catch (e) {
      return HandlerError.run(e)
    }
  }
}

export default userQueries
