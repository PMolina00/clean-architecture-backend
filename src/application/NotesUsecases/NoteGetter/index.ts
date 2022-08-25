import { Note } from '../../../domain/entities/Note'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'

export class NoteGetterUseCase {
  private readonly _noteRepository: NoteRepository

  constructor (noteRepository: NoteRepository) {
    this._noteRepository = noteRepository
  }

  async run (): Promise<Note[]> {
    const notes: Note[] = await this._noteRepository.getAll()
    return notes
  }
}
