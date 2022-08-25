import { Request, Response, NextFunction } from 'express'
import { UserGetterOneUseCase } from '../../../../../application/usecases/UserGetterOne'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'

export const getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dbRepository = new MongoRepository()
  const userGetterOne = new UserGetterOneUseCase(dbRepository)

  const {
    id
  } = req.params

  try {
    const user = await userGetterOne.run(id)
    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}
