import {createWriteStream} from 'fs'
import {join} from 'path'

const PORT = process.env.PORT || 5000

let accessLogStream = createWriteStream(join(process.cwd(), 'access.log'), { flags: 'a' })

export  {PORT,accessLogStream};