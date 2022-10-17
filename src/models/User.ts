import mongoose, { Schema } from 'mongoose'

export interface UserInterface {
 firstName: string
 lastName: string
 email: string
 password: string
 isActive: boolean
}

export interface LoginInterface {
 email: string
 password: string
}

const userSchema = new Schema<UserInterface>(
 {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
 },
 {
  timestamps: true,
 }
)

const User = mongoose.model('User', userSchema)

export default User
