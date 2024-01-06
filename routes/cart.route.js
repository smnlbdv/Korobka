import {Router, response} from 'express'
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
                    {owner: userId}, { $push: { items: infoItem }},
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

cartRoute.delete('/delete/:productId', verifyToken, async (req, res) => {
    const productId = req.params.productId
    const userId = req.userId
    await CartItem.updateOne({owner: userId}, { $pull: { items: { product: productId } } }, { new: true })
        .then((response) => res.status(200).json({delete: response.acknowledged}))
        .catch((error) => res.status(400).json({delete: error.acknowledged}))
})

cartRoute.post('/increase/', verifyToken, async (req, res) => {
    try {
        const productId = req.body.id;
        const userId = req.userId
        await CartItem.updateOne(
            { owner: userId, 'items.product': productId},
            { $inc: { 'items.$.quantity': 1 } },
            { new: true })
            .then((response) => res.status(200).json({increase: response.acknowledged}))
            .catch((error) => res.status(400).json({increase: error.acknowledged}))
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cartRoute.post('/decrease/', verifyToken, async (req, res) => {
    try {
        const productId = req.body.id;
        const userId = req.userId
        await CartItem.updateOne(
            { owner: userId, 'items.product': productId},
            { $inc: { 'items.$.quantity': - 1 } },
            { new: true })
            .then((response) => res.status(200).json({increase: response.acknowledged}))
            .catch((error) => res.status(400).json({increase: error.acknowledged}))
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cartRoute.get('/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId
    
    await CartItem.findOne({owner: userId})
        .populate('items.product')
        .then(item => {
            res.json(item.items)
        })
        .catch(error => res.status(400).json({error: error}))
})



export default cartRoute