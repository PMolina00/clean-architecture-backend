import { Schema, model } from 'mongoose'
import { User } from '../../../../../domain/entities/User'

const userSchema = new Schema<User>({
  id: String,
  email: String,
  password: String,
  name: String,
  username: String,
  age: Number,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.password
  }
})

export const UserModelSchema = model<User>('user', userSchema)
