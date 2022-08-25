import { Router } from 'express'
import {
  getAllNotesController,
  createNoteController,
  updateNoteController,
  deleteNoteController,
  getOneNoteController
} from '../controllers'

const route = Router()

route.get('/', getAllNotesController)
route.get('/:id', getOneNoteController)
route.post('/', createNoteController)
route.put('/', updateNoteController)
route.delete('/', deleteNoteController)

export default route
