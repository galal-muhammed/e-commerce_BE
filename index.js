import express from 'express'
import { dbConnection } from './databases/dbConnections.js'
import * as dotenv from "dotenv"    
import { mainRoutes } from './src/modules/index.routes.js'

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

app.use('/uploads',express.static('uploads'))
mainRoutes(app)
dbConnection()



process.on('unhandledRejection', (err) => {
    console.log("error", err);
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))