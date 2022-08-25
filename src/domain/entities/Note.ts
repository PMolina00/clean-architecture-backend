import { Types } from 'mongoose'

export interface Note {
  id: string
  content: string
  date: string
  important: boolean
  user: Types.ObjectId
}

export interface NoteToUpdate {
  id: string
  content?: string
  date?: string
  important?: boolean
  user?: Types.ObjectId
}

export interface NoteToDelete {
  id: string
  content?: string
  date?: string
  important?: boolean
  user?: Types.ObjectId
}
