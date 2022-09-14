import { NextFunction, Request, Response } from 'express'
import { NoteCreatorUseCase } from '../../../../../application/NotesUsecases/NoteCreator'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'
import { UuidV4Generator } from '../../../../utils/uuidV4Generator'

export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    content,
    date,
    important,
    userId
  } = req.body

  const dbRepository = new MongoNoteRepository()
  const uuidV4Generator = new UuidV4Generator()
  const noteCreateUseCase = new NoteCreatorUseCase(dbRepository, uuidV4Generator)

  const noteToCreate = {
    content,
    date,
    important,
    user: userId
  }

  try {
    const noteCreated = await noteCreateUseCase.run(noteToCreate)
    res.json(noteCreated)
    return
  } catch (e) {
    return next(e)
  }
}
