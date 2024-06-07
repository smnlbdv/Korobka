import {Router} from 'express'

import BoxType from '../models/BoxType.js';
import Product from '../models/Product.js';
import PostCard from '../models/PostCard.js';

const constructorRoute = Router()

constructorRoute.get('/box/types', async (req, res) => {
    try {
        const products = await BoxType.find({ _id: { $ne: "66624b6b5fc83927db2b2ffb" } });
        res.status(200).json(products);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.get('/post-card', async (req, res) => {
    try {
        const products = await PostCard.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});


export default constructorRoute