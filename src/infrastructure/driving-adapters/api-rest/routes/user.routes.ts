import { Router } from 'express'
import {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getOneUserController,
  loginUserController
} from '../controllers'
import { authMiddleware } from '../middleware'

const route = Router()

route.get('/', authMiddleware, getAllUsersController)
route.get('/:id', getOneUserController)
route.post('/', createUserController)
route.put('/', updateUserController)
route.delete('/', deleteUserController)
route.post('/login', loginUserController)

export default route
