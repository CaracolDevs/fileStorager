const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const port = 3001

const passport = require('passport')
const { updateMany } = require('./app/models/user')

// for parsing json
app.use(
    bodyParser.json({
        limit: '20mb'
    })
)
// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

app.use(passport.initialize())

app.use(require('./app/routes'))

app.use(express.static('uploads'))

app.use(express.static("public"));

app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

// Set up view engine and path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views/pages'));



//initDB()