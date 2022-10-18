import { Request } from 'express'
import User from '../../src/models/User'

declare global {
 namespace Express {
  export interface Request {
   user: User
  }
 }
}
