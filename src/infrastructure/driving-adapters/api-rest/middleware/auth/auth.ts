import { NextFunction, Request, Response } from 'express'
import { AuthUseCase } from '../../../../../application/authUsecases/auth'
import { MongoRepository } from '../../../../implementations/mongodb/MongoUserRepository'
import { JwtManagement } from '../../../../utils/jwtManagement'

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1] ?? ''

  const dbRepository = new MongoRepository()
  const jwtManagement = new JwtManagement()
  const authLogin = new AuthUseCase(dbRepository, jwtManagement)

  try {
    const login = await authLogin.run(token)

    if (login === null) {
      res.status(401).send({
        msg: 'Not Authorize'
      })
    }

    req.body.userId = login.id

    return next()
  } catch (e) {
    console.log(e)
    res.status(400).send({
      msg: 'Error in auth middleware',
      error: e
    })
  }
}

export default auth
