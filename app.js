import express from 'express'
import mongoose from 'mongoose'
import morgan  from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser';
import route from './routes/auth.route.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import favoriteRoute from './routes/favorite.route.js';
import emailRoute from './routes/email.route.js';
import userRoute from './routes/userRoute.route.js';
import reviewsRoute from './routes/reviews.route.js';
import adminRoute from './routes/admin.route.js';
import category from './routes/category.route.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use('/api/auth', route)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/favorite', favoriteRoute)
app.use('/api/email', emailRoute)
app.use('/api/profile', userRoute)
app.use('/api/reviews', reviewsRoute)
app.use('/api/admin', adminRoute)
app.use('/api/category', category)


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
