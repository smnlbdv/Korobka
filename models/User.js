import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    avatarUser: {
        type: String,
    },
    status: {
        type: String,
        default: 'Начинающий покупатель'
    },
    name: {
        type: String,
        default: 'Пользователь',
        required: true,
    },
    surname: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    avatarUrl: String,
    order: {
        type: Types.ObjectId, 
        reg: 'Order'
    },
    cart: {
        type: Types.ObjectId,
        reg: 'Cart'
    }
})

export default mongoose.model('User', shema)