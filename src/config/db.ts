import mongoose from 'mongoose'

const url: string = `mongodb://user:password@localhost:27017/enyata?authSource=admin`

const options: mongoose.MongooseOptions = {}

const db = async () => {
 try {
  await mongoose.connect(`${url}`)
  console.info(`Connected to database on worker process: ${process.pid}`)
  return mongoose.Connection
 } catch (error) {
  console.log('Failed to connect to MongoDB', error)
 }
}

export default db
