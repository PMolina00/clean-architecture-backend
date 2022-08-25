import { NoteToDelete } from '../../../domain/entities/Note'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'

export class NoteDeleterUseCase {
  private readonly _noteRepository: NoteRepository

  constructor (noteRepository: NoteRepository) {
    this._noteRepository = noteRepository
  }

  async run (body: NoteToDelete): Promise<NoteToDelete> {
    const note: NoteToDelete = await this._noteRepository.delete(body)
    return note
  }
}
