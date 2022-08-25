import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UserAlReadyExistsException } from '../../../domain/exceptions/UserAlReadyExistsException'
import { MissingFileException } from '../../../domain/exceptions/MissingFileException'
import { ExistUserByEmail } from '../../../domain/services/ExistUserByEmail'
import { UuidGenerator } from '../../../domain/utils/uuidGenerator'
import { encrypt } from '../../../domain/utils/encrypt'

interface UserInput {
  name: string
  username: string
  age: number
  email: string
  password: string
}

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName
  private readonly _existUserByEmail: ExistUserByEmail
  private readonly _uuidGenerator: UuidGenerator
  private readonly _encrypt: encrypt

  constructor (userRepository: UserRepository, uuidGenerator: UuidGenerator, passwordEncrypt: encrypt) {
    this._userRepository = userRepository
    this._uuidGenerator = uuidGenerator
    this._encrypt = passwordEncrypt
    this._existUserByUserName = new ExistUserByUserName(userRepository)
    this._existUserByEmail = new ExistUserByEmail(userRepository)
  }

  async run (body: UserInput): Promise<User> {
    const user: User = {
      id: this._uuidGenerator.generate(),
      name: body.name,
      username: body.username,
      age: body.age,
      email: body.email,
      password: await this._encrypt.encrypt(body.password)
    }
    if (user.username === undefined) throw new MissingFileException('Username')
    if (user.email === undefined) throw new MissingFileException('Email')

    const existUser: boolean = await this._existUserByUserName.run(user.username) || await this._existUserByEmail.run(user.email)

    if (existUser) throw new UserAlReadyExistsException()

    const userCreated: User = await this._userRepository.save(user)

    return userCreated
  }
}
