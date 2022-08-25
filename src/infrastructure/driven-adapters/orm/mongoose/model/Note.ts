import { Schema, model } from 'mongoose'
import { Note } from '../../../../../domain/entities/Note'

const noteSchema = new Schema<Note>({
  id: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  important: { type: Boolean, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

export const NoteModelSchema = model<Note>('note', noteSchema)
