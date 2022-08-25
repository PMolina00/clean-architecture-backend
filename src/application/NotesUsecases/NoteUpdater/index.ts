import { NoteToUpdate } from '../../../domain/entities/Note'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'
import { NoteGetterById } from '../../../domain/services/NoteGetterById'

export class NoteUpdaterUseCase {
  private readonly _noteRepository: NoteRepository
  private readonly _noteGetterById: NoteGetterById

  constructor (noteRepository: NoteRepository) {
    this._noteRepository = noteRepository
    this._noteGetterById = new NoteGetterById(noteRepository)
  }

  async run (data: NoteToUpdate): Promise<NoteToUpdate> {
    const note: NoteToUpdate = await this._noteGetterById.run(data.id)

    const noteToUpdate: NoteToUpdate = {
      id: data.id,
      content: data.content ?? note.content,
      date: data.date ?? note.date,
      important: data.important ?? note.important
    }

    const noteUpdated: NoteToUpdate = await this._noteRepository.update(noteToUpdate)
    return noteUpdated
  }
}
