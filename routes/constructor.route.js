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

constructorRoute.post('/add/types', async (req, res) => {
    try {
        const boxTypes = await BoxType.findById(req.body._id)
        
        if(boxTypes) {
            if(req.body.count > boxTypes.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                res.status(200).json(req.body)
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.post('/inc/types', async (req, res) => {
    try {
        const boxTypes = await BoxType.findById(req.body._id)
        
        if(boxTypes) {
            if(req.body.count + 1 > boxTypes.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                return res.status(200).json({ message: "Товар есть в наличии"})
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.post('/add/product', async (req, res) => {
    try {
        const product = await Product.findById(req.body._id)
        
        if(product) {
            if(req.body.count > product.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                res.status(200).json(req.body)
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.post('/inc/product', async (req, res) => {
    try {
        const product = await Product.findById(req.body._id)
        
        if(product) {
            if(req.body.count + 1 > product.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                return res.status(200).json({ message: "Товар есть в наличии"})
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.post('/add/post-card', async (req, res) => {
    try {
        const postCard = await PostCard.findById(req.body._id)
        
        if(postCard) {
            if(req.body.count > postCard.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                res.status(200).json(req.body)
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

constructorRoute.post('/inc/post-card', async (req, res) => {
    try {
        const postCard = await PostCard.findById(req.body._id)
        
        if(postCard) {
            if(req.body.count + 1 > postCard.count) {
                return res.status(500).json({message: "Товара недостаточно на складе"})
            } else {
                return res.status(200).json({ message: "Товар есть в наличии"})
            }
        } else {
            return res.status(400).json({ error: error.message });
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});




export default constructorRoute