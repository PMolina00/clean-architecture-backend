import { User, UserToDelete, UserToUpdate } from '../entities/User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getByUserName: (userName: string) => Promise<User | null>
  getByEmail: (email: string) => Promise<User | null>
  update: (user: UserToUpdate) => Promise<UserToUpdate>
  delete: (user: UserToDelete) => Promise<UserToDelete>
  getById: (id: string) => Promise<User | null>
}
