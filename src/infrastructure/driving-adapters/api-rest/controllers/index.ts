// Users imports
import { getAllUsers } from './user/getAllUsers.controller'
import { getOneUser } from './user/getOneUser.controller'
import { createUser } from './user/createUser.controller'
import { updateUser } from './user/updateUser.controller'
import { deleteUser } from './user/deleteUser.controller'

// Notes imports
import { getAllNotes } from './note/getAllNotes.controller'
import { getOneNote } from './note/getOneNote.controller'
import { createNote } from './note/createNotes.controller'
import { updateNote } from './note/updateNotes.controller'
import { deleteNote } from './note/deleteNotes.controller'
import login from './user/userLogin.controller'

// Users exports
export {
  getAllUsers as getAllUsersController,
  getOneUser as getOneUserController,
  createUser as createUserController,
  updateUser as updateUserController,
  deleteUser as deleteUserController,
  login as loginUserController
}

// Notes exports
export {
  getAllNotes as getAllNotesController,
  getOneNote as getOneNoteController,
  createNote as createNoteController,
  updateNote as updateNoteController,
  deleteNote as deleteNoteController
}
