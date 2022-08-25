import { NextFunction, Request, Response } from 'express'
import { NoteGetterOneUseCase } from '../../../../../application/NotesUsecases/NoteGetterOne'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'

export const getOneNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dbRepository = new MongoNoteRepository()
  const noteGetterOne = new NoteGetterOneUseCase(dbRepository)

  const {
    id
  } = req.params

  try {
    const note = await noteGetterOne.run(id)
    res.json(note)
    return
  } catch (e) {
    return next(e)
  }
}
