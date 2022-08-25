import { Note, NoteToDelete, NoteToUpdate } from '../../../domain/entities/Note'
import { MongoDBException } from '../../../domain/exceptions/MongoDBException'
import { NoteRepository } from '../../../domain/repositories/NoteRepository'
import { NoteModelSchema } from '../../driven-adapters/orm/mongoose/model/Note'
import { UserModelSchema } from '../../driven-adapters/orm/mongoose/model/User'

export class MongoNoteRepository implements NoteRepository {
  private readonly _mongoDB: typeof NoteModelSchema
  private readonly _userMongoDB: typeof UserModelSchema

  constructor () {
    this._mongoDB = NoteModelSchema
    this._userMongoDB = UserModelSchema
  }

  async getAll (): Promise<Note[]> {
    const notes = await this._mongoDB.find({}).populate('user', {
      username: 1
    })
    return notes
  }

  async save (note: Note): Promise<Note> {
    const id = note.user
    const user: any | null = await this._userMongoDB.findOne({ id })

    if (user === null) throw new Error('UserId not found')

    note.user = user._id

    const noteToCreate = new this._mongoDB(note)

    try {
      const savedNote = await noteToCreate.save()
      user.notes = user.notes?.concat(savedNote?._id)
      user.save()

      return savedNote
    } catch (error) {
      console.log(error)
      throw new MongoDBException('Save')
    }
  }

  async update (note: NoteToUpdate): Promise<NoteToUpdate> {
    const id = note.id
    await this._mongoDB.updateOne({ id: note.id }, {
      content: note.content,
      date: note.date,
      important: note.important
    })
    const noteUpdated = await this._mongoDB.findOne({ id }).populate('user', {
      username: 1
    })
    const returnNote = {
      id: noteUpdated?.id,
      content: noteUpdated?.content,
      date: noteUpdated?.date,
      important: noteUpdated?.important,
      user: noteUpdated?.user
    }
    return returnNote
  }

  async delete (note: NoteToDelete): Promise<NoteToDelete> {
    const id = note.id
    await this._mongoDB.deleteOne({
      id
    })
    return note
  }

  async getById (id: string): Promise<Note | null> {
    const note = await this._mongoDB.findOne({ id }).populate('user', {
      username: 1
    })
    return note
  }
}
