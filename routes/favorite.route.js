import {Router, response} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'

import Favorite from '../models/Favorite.js'
import verifyToken from '../validation/verifyToken.js'

const favoriteRoute = Router()

favoriteRoute.post('/add', verifyToken, async (req, res) => {
    try {
        const { userId, favoriteId } = req.body,
              favoriteItem = await Favorite.findOne({owner: userId})

        if(favoriteItem) {
            await Favorite.updateMany({ owner: userId }, { $push: { items: favoriteId } } );
            const response = await Favorite.findOne({ owner: userId }, { items : favoriteId })
                                            .populate('items').exec();

            res.status(200).json({
                product: response.items[0],
                success: true,
                message: "Товар добавлен в закладки"
            });
        } else {
            await Favorite.insertMany({ owner: userId}, { $push: { items: favoriteId } } );
            const response = await Favorite.findOne({ owner: userId }, { items : favoriteId })
                                            .populate('items').exec();
            res.status(200).json({
                product: response.items[0],
                success: true,
                message: "Товар добавлен в закладки"
            });
        }
    } catch (error) {
        console.log (error);
        res.status(404).json({
            success: false,
            message: "Товар не был добавлен в закладки"
          })
    }
})

favoriteRoute.get('/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId
    await Favorite.findOne({owner: userId})
        .populate('items.product')
        .then(item => {
            res.json(item.items)
        })
        .catch(error => res.status(400).json({error: error}))
})

favoriteRoute.delete('/delete/:productId', verifyToken, async (req, res) => {
    const productId = req.params.productId
    const userId = req.userId
    await Favorite.updateOne({owner: userId}, { $pull: { items: { product: productId } } }, { new: true })
        .then((response) => res.status(200).json({delete: response.acknowledged}))
        .catch((error) => res.status(400).json({delete: error.acknowledged}))
})

export default favoriteRoute