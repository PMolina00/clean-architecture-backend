import { NextFunction, Request, Response } from 'express'
import { NoteDeleterUseCase } from '../../../../../application/NotesUsecases/NoteDeleter'
import { NoteToDelete } from '../../../../../domain/entities/Note'
import { MongoNoteRepository } from '../../../../implementations/mongodb/MongoNoteRepository'

export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    id
  } = req.body
  const dbRepository = new MongoNoteRepository()
  const noteDeleteUseCase = new NoteDeleterUseCase(dbRepository)

  const noteToDelete: NoteToDelete = {
    id
  }

  try {
    const noteDelete = await noteDeleteUseCase.run(noteToDelete)
    res.json(noteDelete)
    return
  } catch (e) {
    return next(e)
  }
}
