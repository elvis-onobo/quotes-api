import { ErrorRequestHandler } from 'express'
// use logger

export const errorMiddleware:ErrorRequestHandler  = (err, req, res, next) => {    
    const status = err.status || 500
    console.log('errror >>>> ', err);
        
    const message = err.message || 'There\'s a problem from our end. We are working to fix this.'

    res.header("Content-Type", 'application/json')
    res.status(status).json({
        success: false,
        status,
        message
    })
}