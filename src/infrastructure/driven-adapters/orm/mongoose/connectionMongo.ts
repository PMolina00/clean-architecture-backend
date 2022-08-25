import mongoose from 'mongoose'

export class MongoConnection {
  private readonly _connectionString: string

  constructor () {
    this._connectionString = process.env.URI_DB ?? ''
  }

  // Connection to mongo
  async connect (): Promise<void> {
    try {
      await mongoose.connect(this._connectionString)
      console.log('DB is connect')
    } catch (error) {
      console.log(error)
    }
  }

  async close (): Promise<void> {
    try {
      await mongoose.connection.close()
      console.log('DB is disconnect')
    } catch (error) {
      console.log(error)
    }
  }
}
