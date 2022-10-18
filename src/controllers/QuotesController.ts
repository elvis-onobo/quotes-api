import { Request, Response } from 'express';
import QuotesService from '../services/QuotesService'

export default class QuotesController {
    public static async quotes(req: Request, res: Response){
        const data = await QuotesService.quotes()
        return res.json({
         status: true,
         message: 'Quotes retreived successfully',
         data
        })
    }
}
