import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { BadRequest, InternalServerError } from 'http-errors'
import { SignupInterface, LoginInterface } from '../interfaces/UserInterface'
import db from '../config/db'

export default class AuthService {
 /**
  * Sign up user
  * @param payload
  * @returns
  */
 public static async signup(payload: SignupInterface): Promise<Boolean> {
  const saltRounds = process.env.SALT_ROUNDS as string

  if (saltRounds == null || saltRounds == undefined) {
   throw new InternalServerError()
  }

  const hash: string = await bcrypt.hash(payload.password, Number(saltRounds))
  payload.password = hash
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
