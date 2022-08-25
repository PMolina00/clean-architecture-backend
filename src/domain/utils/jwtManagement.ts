import { LogInRes, User } from '../entities/User'

export interface jwtManagement {
  generate: (user: User) => Promise<LogInRes>
  compareJwt: (jwt: string) => Promise<User>
}
