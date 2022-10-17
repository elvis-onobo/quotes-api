import express, { Application } from 'express'

import router from './router'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

export default app
