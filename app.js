const express =require ('express')
const cookieParser =require ('cookie-parser')
const logger =require ('morgan')
const indexRouter = require ('./src/rutes/index')
const session = require('express-session');
const Mongostore = require('connect-mongo')


require('dotenv').config()


const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(logger('dev'))

app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    saveUninitialized: true,
    store: Mongostore.create({mongoUrl: 'mongodb://localhost/session'})
}))

app.use(cookieParser(process.env.COOKIES_SECRET || '123456'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)

module.exports = app;