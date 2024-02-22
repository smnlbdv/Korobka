import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Product from '../models/Product.js'

const productRoute = Router()

productRoute.get('/all', async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;

    try {
        const totalCount = await Product.find().countDocuments();
        const products = await Product.find()
                 .skip((page - 1) * limit)
                 .limit(limit);
        res.json({ total: totalCount, products: products });
    } catch (error) {
        console.log(error.message)
    }
})

productRoute.get('/new', async (req, res) => {
    try {
        const newProduct = await Product.find({category: 'new'})
        res.json(newProduct)
    } catch (error) {
        console.log(error.message)
    }
})

productRoute.get('/:id', async (req, res) => {
    try {
        await Product.find({_id: req.params.id})
                     .then((product) => {
                        res.status(200).json(product)
                     })
                     .catch((error) => {
                        res.status(400).json({error: error})
                     })
    } catch (error) {
        console.log(error.message)
    }
})

export default productRoute