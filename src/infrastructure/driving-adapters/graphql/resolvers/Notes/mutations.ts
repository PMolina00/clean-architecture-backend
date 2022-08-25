import { NoteCreatorUseCase } from '../../../../../application/NotesUsecases/NoteCreator'
import { NoteUpdaterUseCase } from '../../../../../application/NotesUsecases/NoteUpdater'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'
import { UuidV4Generator } from '../../../../utils/uuidV4Generator'
import { HandlerError } from '../../utils/HandlerError'

const noteMutations = {
  createNote: async (_: any, args: any) => {
    const {
      note: {
        content,
        date,
        important,
        user
      }
    } = args

    const dbRepository = new MongoNoteRepository()
    const uuidV4Generator = new UuidV4Generator()
    const noteCreateUseCase = new NoteCreatorUseCase(dbRepository, uuidV4Generator)

    const noteToCreate = {
      content,
      date,
      important,
      user
    }

    try {
      const noteCreated = await noteCreateUseCase.run(noteToCreate)

      return noteCreated
    } catch (e) {
      return HandlerError.run(e)
    }
  },
  updateNote: async (_: any, args: any) => {
    const {
      note: {
        id,
        content,
        date,
        important
      }
    } = args
    const dbRepository = new MongoNoteRepository()
    const noteUpdateUseCase = new NoteUpdaterUseCase(dbRepository)

    const noteToUpdate = {
      id,
      content,
      date,
      important
    }

    try {
      const noteUpdate = await noteUpdateUseCase.run(noteToUpdate)
      return noteUpdate
    } catch (e) {
      return HandlerError.run(e)
    }
  }
}

export default noteMutations
