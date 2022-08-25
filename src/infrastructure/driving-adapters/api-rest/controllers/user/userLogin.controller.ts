import { NextFunction, Request, Response } from 'express'
import { AuthLoginUseCase } from '../../../../../application/authUsecases/authLogin'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'
import { PasswordEncrypt } from '../../../../utils/encryptPassword'
import { JwtManagement } from '../../../../utils/jwtManagement'

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    userName,
    password
  } = req.body

  const dbRepository = new MongoRepository()
  const userAuth = new PasswordEncrypt()
  const jwtManagement = new JwtManagement()
  const authLogin = new AuthLoginUseCase(dbRepository, userAuth, jwtManagement)

  try {
    const login = await authLogin.run({ userName, password })

    if (login === null) {
      res.status(401).send({
        msg: 'Not Authorize'
      })
    }

    res.status(200).send(login)

    return
  } catch (e) {
    res.status(400).send({
      msg: 'Error in Login',
      error: e
    })
  }
}

export default login
