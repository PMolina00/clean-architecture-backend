import { Router } from 'express'
import {
  getAllNotesController,
  createNoteController,
  updateNoteController,
  deleteNoteController,
  getOneNoteController
} from '../controllers'
import { authMiddleware } from '../middleware'

const route = Router()

route.get('/', authMiddleware, getAllNotesController)
route.get('/:id', authMiddleware, getOneNoteController)
route.post('/', authMiddleware, createNoteController)
route.put('/', authMiddleware, updateNoteController)
route.delete('/', authMiddleware, deleteNoteController)

export default route
