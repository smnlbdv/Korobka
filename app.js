import express from 'express'
import mongoose from 'mongoose'
import morgan  from 'morgan';
// import {validationResult} from 'express-validator'
import cors from 'cors'
import route from './routes/auth.route.js'
import productRoute from './routes/product.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan(process.env.LOG_LEVEL))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cors())
app.use('/api/auth', route)
app.use('/products', productRoute)

async function start() {
    try {
        await mongoose.connect("mongodb+srv://lbdwsmn:12345@cluster0.1d800tl.mongodb.net/korobka?retryWrites=true&w=majority")
        .then(() => {
            console.log('Вы подключились к базе')
        })
        .catch(() => {
            console.log('Произошла ошибка подключения')
        })
        
        app.listen(PORT, () => {
            console.log('Сервер запущен на порту: ' + PORT)
        })
    } catch (error) {
        console.log("Произошла ошибка: " + error)
    }
}

start()
