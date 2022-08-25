import { Request, Response, Router, NextFunction } from 'express'
import { UserAlReadyExistsException } from '../../../../domain/exceptions/UserAlReadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import userRoutes from './user.routes'
import noteRoutes from './note.routes'

const route = Router()

route.use('/users', userRoutes)

route.use('/notes', noteRoutes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlReadyExistsException) {
    res.status(400).json({
      message: 'El usuario ya ha sido registrado'
    })
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'El usuario no existe'
    })
  } else {
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
