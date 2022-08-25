import { Request, Response, NextFunction } from 'express'
import { UserUpdaterUseCase } from '../../../../../application/usecases/UserUpdater'
import { UserToUpdate } from '../../../../../domain/entities/User'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    id,
    name,
    username,
    age
  } = req.body
  const dbRepository = new MongoRepository()
  const userUpdateUseCase = new UserUpdaterUseCase(dbRepository)

  const userToUpdate: UserToUpdate = {
    id,
    name,
    username,
    age
  }

  try {
    const userUpdated = await userUpdateUseCase.run(userToUpdate)
    res.json(userUpdated)
    return
  } catch (e) {
    return next(e)
  }
}
