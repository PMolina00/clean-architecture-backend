export interface Note {
  id: string
  content: string
  date: string
  important: boolean
  user: any
}

export interface NoteToUpdate {
  id: string
  content?: string
  date?: string
  important?: boolean
  user?: any
}

export interface NoteToDelete {
  id: string
  content?: string
  date?: string
  important?: boolean
  user?: any
}
