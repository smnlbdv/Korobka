import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation/auth.js'
import verifyToken from '../validation/verifyToken.js'
import multer from 'multer'

import Review from '../models/Review.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

const reviewsRoute = Router()

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
        const bestReviews = await Review.find({ stars: 5 }).limit(5).select('owner text stars date').populate('owner');
        // console.log(bestReviews.date.get())
        res.json(bestReviews);
    } catch (error) {
        console.log(error.message);
    }
})

//для карточки товара
// const bestReviews = await Review.find({ stars: 5 }).limit(5).populate('owner product comments');

export default reviewsRoute