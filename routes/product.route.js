import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Product from '../models/Product.js'
import Category from '../models/Category.js'

const productRoute = Router()

productRoute.get('/all', async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 12;
    const searchQuery = req.query._search;
    const categoryId = req.query._category;

    try {
        let query = {};

        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { preText: { $regex: searchQuery, $options: 'i' } }
            ];
        }
    
        if (categoryId) {
            const category = await Category.findOne({ _id: categoryId });
            
            if (category && category.key !== "all") {
                query['category'] = { $in: [category._id] };
            }
        }
    
        const totalCount = await Product.find(query).countDocuments();
        const products = await Product.find(query)
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