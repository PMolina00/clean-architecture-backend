import { NextFunction, Request, Response } from 'express'
import { NoteGetterUseCase } from '../../../../../application/NotesUsecases/NoteGetter'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'

export const getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dbRepository = new MongoNoteRepository()
  const noteGetter = new NoteGetterUseCase(dbRepository)

  console.log()

  try {
    const notes = await noteGetter.run(req.body.userId)
    res.json(notes)
    return
  } catch (e) {
    return next(e)
  }
}
