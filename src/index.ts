import 'express-async-errors'
import app from './app'

const PORT = 4000
// connect to database

app.listen(PORT, () => {
 console.log(`App listening on port ${PORT}`)
})
