import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    name: {
        type: String,
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
    phone: String,
    avatarUrl: String,
    order: [{
        type: Types.ObjectId, reg: "Order"
    }],
    cart: [{
        type: Types.ObjectId, reg: "Cart"
    }]
})

export default mongoose.model('User', shema)