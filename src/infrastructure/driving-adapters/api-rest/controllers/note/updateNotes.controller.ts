import { NextFunction, Request, Response } from 'express'
import { NoteUpdaterUseCase } from '../../../../../application/NotesUsecases/NoteUpdater'
import { NoteToUpdate } from '../../../../../domain/entities/Note'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'

export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    id,
    content,
    date,
    important
  } = req.body
  const dbRepository = new MongoNoteRepository()
  const noteUpdateUseCase = new NoteUpdaterUseCase(dbRepository)

  const noteToUpdate: NoteToUpdate = {
    id,
    content,
    date,
    important
  }

  try {
    const noteUpdated = await noteUpdateUseCase.run(noteToUpdate)
    res.json(noteUpdated)
    return
  } catch (e) {
    return next(e)
  }
}
