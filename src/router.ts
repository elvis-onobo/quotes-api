import express from 'express'
import AuthController from './controllers/AuthController'
import QuotesController from './controllers/QuotesController'
// middleware
import authMiddleware from './middleware/authMiddleware'

const router = express.Router()
export default router

router.post('/auth/signup', AuthController.signup)
router.post('/auth/login', AuthController.login)
router.get('/quote/fetch', authMiddleware, QuotesController.quotes)
