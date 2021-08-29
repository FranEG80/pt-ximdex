import fs from 'fs'
import path from 'path'
import loggerLocal from '../Logger/logger.local'

const handleError = (err) => loggerLocal.error(`Error writing in log file ${pathfile} - error: ${err}`)

export const insertRow = ({filename, pathname, message}) => {
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname)
  }
  let pathfile = path.join(pathname, filename)
  if (fs.existsSync(pathfile)) {
    return fs.appendFileSync(pathfile, message, handleError)
  }
  fs.writeFileSync(pathfile, message, handleError)
}
