import { Note } from '../../../domain/entities/Note'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'

export class NoteGetterOneUseCase {
  private readonly _noteRepository: NoteRepository

  constructor (noteRepository: NoteRepository) {
    this._noteRepository = noteRepository
  }

  async run (id: string): Promise<Note | null> {
    const note: Note | null = await this._noteRepository.getById(id)
    return note
  }
}
