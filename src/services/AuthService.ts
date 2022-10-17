import { SignupInterface } from '../interfaces/UserInterface'
import db from '../config/db'

export default class AuthService {
 public static async signup(payload: SignupInterface): Promise<Boolean> {
  db.create(payload)

  return true
 }
}
