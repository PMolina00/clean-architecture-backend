
export interface encrypt {
  encrypt: (password: string) => Promise<string>
  comparePassword: (passwordEncrypt: string, password: string) => Promise<boolean>
}
