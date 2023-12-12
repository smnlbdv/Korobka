import {Router} from 'express'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import CartItem from '../models/Cart.js'
import verifyToken from '../validation/verifyToken.js'

const cartRoute = Router()

const checkItems = (arr, itemId) => {
    for (let item of arr) {
        if(String(item.product) === itemId) {
            return {
                answer: true,
                quantity: item.quantity
            }
        }
    }
    return {
        answer: false
    }
}

cartRoute.post('/add', verifyToken, async (req, res) => {
    try {
        const { userId, itemId } = req.body
        const cartItem = await CartItem.findOne({owner: userId})
        
        if(cartItem) {            
            const checkItem = checkItems(cartItem.items, itemId)

            if(checkItem.answer) {
                const newQuantity = checkItem.quantity + 1
                await CartItem.updateOne(
                    { "items.product": itemId },
                    { $set: { "items.$.quantity": newQuantity }}, 
                );
                const cart = await CartItem.findOne(
                    { 'items': { $elemMatch: { 'product': itemId } } },
                    { 'items.$': 1 })
                    .populate('items.product');
    
                const product = cart.items[0].product
                const count = cart.items[0].quantity
                res.status(201).json({product, count})

            } else {
                const infoItem = {
                    product: itemId,
                    quantity: 1
                }
                await CartItem.updateOne(
                    { $push: { items: infoItem }},
                );
                const cart = await CartItem.findOne(
                    { 'items': { $elemMatch: { 'product': itemId } } },
                    { 'items.$': 1 })
                    .populate('items.product');
    
                const product = cart.items[0].product
                const count = cart.items[0].quantity
                res.status(201).json({product, count})
            }

        } else {
            const infoItem = {
                product: itemId,
                quantity: 1
            }
            await CartItem.insertMany({owner: userId, items: infoItem})

            const cart = await CartItem.findOne(
                { 'items': { $elemMatch: { 'product': itemId } } },
                { 'items.$': 1 })
                .populate('items.product');
            
                const product = cart.items[0].product
                const count = cart.items[0].quantity
                res.status(201).json({product, count})
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


export default cartRoute