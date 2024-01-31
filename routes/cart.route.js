import {Router, response} from 'express'

import User from '../models/User.js'
import CartItem from '../models/Cart.js'
import verifyToken from '../validation/verifyToken.js'

const cartRoute = Router()

cartRoute.post('/add/:itemId', verifyToken, async (req, res) => {
    try {
        const { userId } = req.body
        const itemId = req.params.itemId
        const cartItem = await CartItem.findOne({owner: userId})

        console.log(userId)

        // if (cartItem) {
        //     if (cartItem.items.length === 0) {
        //         const item = {
        //             product: itemId,
        //             quantity: 1
        //         };
        //         await CartItem.create({ owner: userId, items: [item] });
        //         const newCartItem = await CartItem.find({ owner: userId, items: { $elemMatch: { product: itemId } } })
        //                                         .populate('items.product');

        //         const product = newCartItem[0].items[0].product;
        //         const count = newCartItem[0].items[0].quantity
        //         res.status(201).json({product, count})

        //     } else {
        //         const cartItemIndex = cartItem.items.findIndex(item => item.product == itemId);
        //         if (cartItemIndex != -1) {
        //             cartItem.items[cartItemIndex].quantity += 1;
        //         } else {
        //             const newItem = {
        //             product: itemId,
        //             quantity: 1
        //             };
        //             cartItem.items.push(newItem);
        //         }
        //         cartItem.save();
        //         const newCartItem = await CartItem.find({ owner: userId, items: { $elemMatch: { product: itemId } } })
        //                                         .populate('items.product');


        //         const product = newCartItem[0].items[0].product;
        //         const count = newCartItem[0].items[0].quantity
        //         res.status(201).json({product, count})
        //     }
        // } else {
        //     const item = {
        //         product: itemId,
        //         quantity: 1
        //     };
        //     await CartItem.create({ owner: userId, items: [item]});
        //     const newCartItem = await CartItem.find({ owner: userId, items: { $elemMatch: { product: itemId } } })
        //                                         .populate('items.product');

        //     await User.findByIdAndUpdate({_id: userId}, {cart: newCartItem[0]._id})

        //     const product = newCartItem[0].items[0].product;
        //     const count = newCartItem[0].items[0].quantity
        //     res.status(201).json({product, count})
        // }

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

export default cartRoute