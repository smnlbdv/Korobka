import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    avatarUser: {
        type: String,
        default: 'http://localhost:5000/avatar/default-avatar.png'
    },
    status: {
        type: String,
        default: 'Начинающий покупатель'
    },
    role: {
        type: Number,
        default: 0
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
        ref: 'Order',
        default: '65b937ebbb6114084771a1b9'
    },
    cart: {
        type: Types.ObjectId,
        ref: 'Cart',
        default: '65b937ebbb6114084771a1b9'
    },
    favorite: {
        type: Types.ObjectId,
        ref: 'Favorite',
        default: '65b937ebbb6114084771a1b9'
    }
})

export default mongoose.model('User', shema)