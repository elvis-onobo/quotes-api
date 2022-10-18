import axios from 'axios'
import redis from '../config/redis'
import { NotFound } from 'http-errors'
export default class QuotesService {
 /**
  * Fetch quotes and randomly return one quote
  * @returns
  */
 public static async quotes() {
  let quotes: string | Array<{}>

  quotes = (await redis.get('quotes')) as string
  quotes = JSON.parse(quotes)

  if (quotes == null) {
   const result = await axios.get('https://type.fit/api/quotes')
   quotes = result.data
   await redis.set('quotes', JSON.stringify(quotes))
  }

  if (quotes == null) {
   throw new NotFound('No quote found')
  }

  const quote = quotes[Math.floor(Math.random() * quotes.length)]

  return quote
 }
}
