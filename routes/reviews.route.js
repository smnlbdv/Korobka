import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation/auth.js'
import verifyToken from '../validation/verifyToken.js'
import multer from 'multer'
import moment from 'moment'

import Review from '../models/Review.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

moment.locale('ru');
const reviewsRoute = Router()

function modifiedReaviews(obj) {
    return obj.map(obj => ({
        ...obj._doc,
        date: moment(obj.date).format('LL')
    }));
}

// reviewsRoute.get('/', verifyToken, async (req, res) => {
//     // const userId = req.params.userId
//     // await User.findOne({_id: userId})
//     //     .then(item => {
//     //         res.status(201).json({
//     //             name: item.name,
//     //             surname: item.surname,
//     //             email: item.email,
//     //             phone: item.phone,
//     //             status: item.status,
//     //             avatarUser: item.avatarUser
//     //         })
//     //     })
//     //     .catch(error => res.status(400).json({error: error}))
// })

reviewsRoute.get('/best', async (req, res) => {
    try {
        const bestReviews = await Review.find({stars: 5}).limit(5).select('owner text stars date likes').populate('owner');
        const modifiedData = modifiedReaviews(bestReviews)
        res.json(modifiedData);
    } catch (error) {
        console.log(error.message);
    }
})

reviewsRoute.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const reviewsProduct = await Review.find({product: req.params.id}).populate('owner comments');
        const modifiedData = modifiedReaviews(reviewsProduct)
        res.status(200).json(modifiedData);

    } catch (error) {
        console.log(error.message)
    }
})

export default reviewsRoute