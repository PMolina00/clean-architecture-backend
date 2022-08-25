import { Request, Response, NextFunction } from 'express'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'
import { UuidV4Generator } from '../../../../utils/uuidV4Generator'
import { PasswordEncrypt } from '../../../../utils/encryptPassword'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    username,
    age,
    email,
    password
  } = req.body

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
    res.json(userCreated)
    return
  } catch (e) {
    return next(e)
  }
}
