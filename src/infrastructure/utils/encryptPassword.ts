import { encrypt } from '../../domain/utils/encrypt'
import bcrypt from 'bcrypt'

export class PasswordEncrypt implements encrypt {
  async encrypt (password: string): Promise<string> {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    return passwordHash
  }

  async comparePassword (passwordEncrypt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordEncrypt)
  }
}
