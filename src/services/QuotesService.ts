import axios from 'axios'
import { NotFound } from 'http-errors'
export default class QuotesService {
 public static async quotes() {
  const result = await axios.get('https://type.fit/api/quotes')
  const data = result.data

  if (data == null) {
   throw new NotFound('No quote found')
  }

  return data
 }
}
