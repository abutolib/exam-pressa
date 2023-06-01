import express from 'express'
import morgan from 'morgan'
import {resolve} from 'path'
import { PORT } from './config.js'
import cors from 'cors'
import errorhandler from './middlewares/errorhandler.js'
import fileUpload from 'express-fileupload'
import adminRouter from './routers/admin.router.js'
import postRouter from './routers/post.router.js'
import { accessLogStream } from './config.js'

const app = express()

app.use(cors())
app.use(express.static(resolve('uploads')))
app.use(express.json())
app.use(fileUpload())

app.use(morgan('combined',{skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream }))

app.use(adminRouter)
app.use(postRouter)


app.use(errorhandler)

app.listen(PORT, () => console.log('server running on ' + PORT))
