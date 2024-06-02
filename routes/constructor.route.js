import {Router} from 'express'

import BoxType from '../models/BoxType.js';
import Product from '../models/Product.js';

const constructorRoute = Router()

constructorRoute.get('/box/types', async (req, res) => {
    try {
        const products = await BoxType.find();
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


export default constructorRoute