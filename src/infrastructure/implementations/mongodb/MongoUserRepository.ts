import { User, UserToDelete, UserToUpdate } from '../../../domain/entities/User'
import { MongoDBException } from '../../../domain/exceptions/MongoDBException'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserModelSchema } from '../../driven-adapters/orm/mongoose/model/User'

export class MongoRepository implements UserRepository {
  private readonly _mongoDB: typeof UserModelSchema

  constructor () {
    this._mongoDB = UserModelSchema
  }

  async getAll (): Promise<User[]> {
    const users = await this._mongoDB.find({}).populate('notes', {
      content: 1,
      date: 1,
      important: 1
    })
    return users
  }

  async save (user: User): Promise<User> {
    const userToCreate = new this._mongoDB(user)
    try {
      return await userToCreate.save()
    } catch (error) {
      console.log(error)
      throw new MongoDBException('Save')
    }
  }

  async update (user: UserToUpdate): Promise<UserToUpdate> {
    await this._mongoDB.updateOne({ id: user.id }, {
      name: user.name,
      username: user.username,
      age: user.age
    })
    const userUpdated = await this._mongoDB.findOne({ id: user.id }).populate('notes', {
      content: 1,
      date: 1,
      important: 1
    })

    const returnUser = {
      id: userUpdated?.id,
      name: userUpdated?.name,
      username: userUpdated?.username,
      age: userUpdated?.age,
      email: userUpdated?.email,
      notes: userUpdated?.notes
    }
    return returnUser
  }

  async delete (user: UserToDelete): Promise<UserToDelete> {
    await this._mongoDB.deleteOne({
      id: user.id
    })
    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const user = await this._mongoDB.findOne({ username })
    return user
  }

  async getByEmail (email: string): Promise<User | null> {
    const user = await this._mongoDB.findOne({ email })
    return user
  }

  async getById (id: string): Promise<User | null> {
    const user = await this._mongoDB.findOne({ id })
    return user
  }
}
