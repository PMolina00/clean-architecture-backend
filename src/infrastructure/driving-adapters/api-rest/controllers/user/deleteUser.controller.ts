import { Request, Response, NextFunction } from 'express'
import { UserDeleteUseCase } from '../../../../../application/usecases/UserDeleter'
import { UserToDelete } from '../../../../../domain/entities/User'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    id
  } = req.body
  const dbRepository = new MongoRepository()
  const userDeleteUseCase = new UserDeleteUseCase(dbRepository)

  const userToDelete: UserToDelete = {
    id
  }

  try {
    const userDelete = await userDeleteUseCase.run(userToDelete)
    res.json(userDelete)
    return
  } catch (e) {
    return next(e)
  }
}
