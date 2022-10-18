import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { BadRequest } from 'http-errors'
import { SignupInterface, LoginInterface } from '../interfaces/UserInterface'
import db from '../config/db'

export default class AuthService {
 /**
  * Sign up user
  * @param payload
  * @returns
  */
 public static async signup(payload: SignupInterface): Promise<Boolean> {
  await db.create(payload)
  return true
 }

 /**
  * Login user
  * @param payload
  * @returns
  */
 public static async login(payload: LoginInterface) {
  const userData = await db.findOneByEmail(payload.email)

  let passwordIsCorrect = await bcrypt.compare(payload.password, userData.password)
  if (!passwordIsCorrect) {
   throw new BadRequest('Incorrect password')
  }

  const token = jsonwebtoken.sign(userData, process.env.APP_KEY as string)
  return {
   user: userData,
   token,
  }
 }
}
