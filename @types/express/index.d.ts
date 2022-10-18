import { Request } from 'express'
import { UserInterface } from '../../src/interfaces/UserInterface'

declare global {
 namespace Express {
  export interface Request {
   user: UserInterface
  }
 }
}
