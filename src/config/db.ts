import fs from 'fs/promises'

/**
 * This class mimicks a database by writing to to a file and reading from a file
 */
const create = async (content: any) => {
 return await fs.appendFile('./db.json', JSON.stringify(content))
}

const fetch = async () => {
 return await fs.readFile('/db.json', { encoding: 'utf8' })
}

export default {
 create,
 fetch,
}
