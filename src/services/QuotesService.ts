import axios from 'axios'
import { NotFound } from 'http-errors'
export default class QuotesService {
 /**
  * Fetch quotes and randomly return one quote
  * @returns
  */
 public static async quotes() {
  const result = await axios.get('https://type.fit/api/quotes')
  const quotes = result.data

  if (quotes == null) {
   throw new NotFound('No quote found')
  }

  const quote = quotes[Math.floor(Math.random()*quotes.length)]

  return quote
 }
}
