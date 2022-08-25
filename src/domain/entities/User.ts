
export interface User {
  id: string
  name: string
  username: string
  age: number
  email: string
  password: string
  notes?: []
}

export interface LogInRes {
  token: string
}

export interface LogInReq {
  userName: string
  password: string
}

export interface UserToUpdate {
  id: string
  name?: string
  username?: string
  age?: number
  email?: string
  password?: string
  notes?: []
}

export interface UserToDelete {
  id: string
  name?: string
  username?: string
  age?: number
  email?: string
  password?: string
  notes?: []
}
