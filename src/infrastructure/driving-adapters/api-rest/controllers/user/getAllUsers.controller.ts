import { Request, Response, NextFunction } from 'express'
import { UserGetterUseCase } from '../../../../../application/usecases/UserGetter'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dbRepository = new MongoRepository()
  const userGetter = new UserGetterUseCase(dbRepository)

  try {
    const users = await userGetter.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
