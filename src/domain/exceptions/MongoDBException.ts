export class MongoDBException extends Error {
  constructor (msg: string) {
    super(msg + ' fail in MongoDB')
  }
}
