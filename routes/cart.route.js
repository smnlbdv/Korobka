import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import CartItem from '../models/Cart.js'

const cartRoute = Router()

cartRoute.post('/add', async (req, res) => {
    try {
        const { userId, itemId } = req.body

        console.log(itemId)

        const infoItem = {
            product: itemId,
            quantity: 1
        }

        const cartItem = await CartItem.find({owner: userId})

        if(cartItem.length != 0) {
            console.log('корзина уже есть')
        } else {
            await CartItem.insertMany({owner: userId, items: infoItem})
        }

    } catch (error) {
        console.log(error.message)
    }
})


export default cartRoute