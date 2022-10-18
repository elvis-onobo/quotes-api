import fs from 'fs/promises'
import bcrypt from 'bcrypt'
import { SignupInterface } from '../interfaces/UserInterface'

const saltRounds = 10 // use .env'

/**
 * Write content to file
 * @param content
 * @returns
 */
const create = async (content: any = null) => {
 let data: { [key: string]: SignupInterface } = {}

 if (content == null) {
  throw new Error('Cannot save null values to file')
 }

 const hash: string = await bcrypt.hash(JSON.stringify(content), saltRounds)
 let dbData = await fetch()
 if (dbData != null && dbData != '') {
  data = JSON.parse(dbData)
 }

 let objectOnFileKeys: Array<string> = Object.keys(data)

 if (objectOnFileKeys.length > 0) {
  objectOnFileKeys.map(async (key) => {
   let keyExists = await bcrypt.compare(JSON.stringify(content), key)

   if (keyExists) {
    delete data[key]
    data[key] = content
   }
  })
 } else {
  data[hash] = content
 }

 return await fs.writeFile('./db.json', JSON.stringify(data))
}

/**
 * Read content from file
 * @returns
 */
const fetch = async () => {
 return await fs.readFile('./db.json', { encoding: 'utf8' })
}

/**
 * Get a signle item
 * @param query
 * @returns
 */
const findOneByEmail = async (email: string) => {
 let fileData: string = await fs.readFile('./db.json', { encoding: 'utf8' })
 let data: { [key: string]: SignupInterface } = JSON.parse(fileData)

 const result = Object.values(data).filter((dataObject) => {
  if (email == dataObject.email) {
   return dataObject
  }
 })
 return result[0]
}

export default {
 create,
 fetch,
 findOneByEmail,
}
