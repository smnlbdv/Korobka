import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Product from '../models/Product.js'

const productRoute = Router()

productRoute.get('/new', async (req, res) => {
    try {
        console.log(req.params.message)
        const newProduct = await Product.find({category: "new"})
        console.log(newProduct)
        res.json(newProduct)
    } catch (error) {
        console.log(error.message)
    }
})


export default productRoute