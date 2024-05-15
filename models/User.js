import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    avatarUser: {
        type: String,
        default: 'http://localhost:5000/avatar/default-avatar.svg'
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
        type: Types.ObjectId, 
        required: true,
        unique: true,
        ref: 'Email'
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    order: [{
        type: Types.ObjectId, 
        ref: 'Order',
        default: []
    }],
    cart: {
        type: Types.ObjectId,
        ref: 'Cart',
        default: null
    },
    favorite: {
        type: Types.ObjectId,
        ref: 'Favorite',
        default: null
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String,
    } 
})

export default mongoose.model('User', shema)