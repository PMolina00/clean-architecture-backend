import { Note, NoteToDelete, NoteToUpdate } from '../entities/Note'

export interface NoteRepository {
  getAll: (id: string) => Promise<Note[]>
  save: (note: Note) => Promise<Note>
  update: (note: NoteToUpdate) => Promise<NoteToUpdate>
  delete: (note: NoteToDelete) => Promise<NoteToDelete>
  getById: (id: string) => Promise<Note | null>
}
