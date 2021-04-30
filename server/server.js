require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
const cors = require('cors')

//connect to db
require('./config/db')()

//Import Routes
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const meRoutes = require('./routes/me')

const app = express()
app.use(express.json())
app.use(cors())

//Socket IO
require('./socket/server')

//Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/me', meRoutes)

app.listen(process.env.PORT, (err) => {
    if(err) console.error(err)
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})
