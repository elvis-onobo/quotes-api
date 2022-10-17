import { Request, Response } from 'express'
import AuthService from '../services/AuthService'

export default class AuthController {
    public static async signup(req:Request, res:Response): Promise<Response>{ 
        const payload = req.body
        const data = await AuthService.signup(payload)
        return res.json(data)
    }
}