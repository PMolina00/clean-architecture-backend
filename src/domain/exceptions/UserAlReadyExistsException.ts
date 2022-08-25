export class UserAlReadyExistsException extends Error {
  constructor () {
    super('User already exists')
  }
}
