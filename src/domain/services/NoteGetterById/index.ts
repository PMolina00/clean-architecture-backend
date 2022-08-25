import { Note } from '../../entities/Note'
import { NoteRepository } from '../../repositories/NoteRepository'

export class NoteGetterById {
  private readonly _noteRepository: NoteRepository

  constructor (noteRepository: NoteRepository) {
    this._noteRepository = noteRepository
  }

  async run (id: string): Promise<Note> {
    const note = await this._noteRepository.getById(id)

    if (note === null) throw new Error('Note not find')

    return note
  }
}
