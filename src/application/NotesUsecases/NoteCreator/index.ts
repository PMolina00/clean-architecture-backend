import { Note } from '../../../domain/entities/Note'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'
import { UuidGenerator } from '../../../domain/utils/uuidGenerator'

interface noteInput {
  content: string
  date: string
  important: boolean
  user: any
}

export class NoteCreatorUseCase {
  private readonly _noteRepository: NoteRepository
  private readonly _uuidGenerator: UuidGenerator

  constructor (noteRepository: NoteRepository, uuidGenerator: UuidGenerator) {
    this._noteRepository = noteRepository
    this._uuidGenerator = uuidGenerator
  }

  async run (body: noteInput): Promise<Note> {
    const noteToCreate: Note = {
      id: this._uuidGenerator.generate(),
      content: body.content,
      date: body.date,
      important: body.important,
      user: body.user
    }
    const noteCreated: Note = await this._noteRepository.save(noteToCreate)
    return noteCreated
  }
}
