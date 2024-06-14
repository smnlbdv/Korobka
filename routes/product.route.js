import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Category from '../models/Category.js'
import BoxType from '../models/BoxType.js'
import Box from '../models/Box.js'

const boxRoute = Router()

boxRoute.get('/all', async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 12;
    const searchQuery = req.query._search;
    const categoryId = req.query._category || "65d90e58227ee6433a601d3b";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

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

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = minPrice;
            }
            if (maxPrice) {
                query.price.$lte = maxPrice;
            }
        }
    
        const totalCount = await Box.find(query).countDocuments();
        const products = await Box.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({ total: totalCount, products: products });
    } catch (error) {
        console.log(error.message)
    }
})

boxRoute.get('/new', async (req, res) => {
    try {
        const newProducts = await Box.find().populate({
            path: 'category',
            match: { key: 'new' }
        }).limit(4).exec();
        res.json(newProducts)
    } catch (error) {
        console.log(error.message)
    }
})

boxRoute.get('/:id', async (req, res) => {
    try {
        const product = await Box.findById(req.params.id).populate('category');
        
        if (!product) {
            return res.status(500).json({ error: 'Товар не найден' });
        }
        
        const similarProducts = await Box.find({ 
            category: { $in: product.category } 
        }).exec();
        
        res.status(200).json({product: product, similarProducts: similarProducts});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


export default boxRoute