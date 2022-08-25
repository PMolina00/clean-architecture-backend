export class MissingFileException extends Error {
  constructor (tagMiss: string) {
    super(tagMiss + ' not exists')
  }
}
