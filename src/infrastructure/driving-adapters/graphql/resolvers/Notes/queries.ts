import { NoteGetterUseCase } from '../../../../../application/NotesUsecases/NoteGetter'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'
import { HandlerError } from '../../utils/HandlerError'

const noteQueries = {
  note: async (_: any, args: any) => {
    const dbRepository = new MongoNoteRepository()
    const noteGetter = new NoteGetterUseCase(dbRepository)

    try {
      const notes = await noteGetter.run()
      return notes
    } catch (e) {
      return HandlerError.run(e)
    }
  }
}

export default noteQueries
