import { Request, Response } from 'express'
import AuthService from '../services/AuthService'

export default class AuthController {
 public static async signup(req: Request, res: Response): Promise<Response> {
  const payload = req.body
  const data = await AuthService.signup(payload)
  return res.json({
   status: true,
   message: 'Signup successful',
   data
  })
 }

 public static async login(req: Request, res: Response): Promise<Response> {
  const payload = req.body
  const data = await AuthService.login(payload)
  console.log('>> ', data);
  
  return res.json({
   status: true,
   message: 'Login successful',
   data,
  })
 }
}
