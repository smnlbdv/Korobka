import {Router} from 'express'
import fs from "fs";
import multer from "multer";
import * as uuid  from 'uuid';

import BoxType from '../models/BoxType.js';
import Product from '../models/Product.js';
import PostCard from '../models/PostCard.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/style-box");
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuid.v4()
        const fileName =  uniqueFilename + '-' + file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

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

constructorRoute.get('/add/types', async (req, res) => {
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

constructorRoute.get('/inc/types', async (req, res) => {
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

constructorRoute.get('/add/product', async (req, res) => {
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

constructorRoute.get('/inc/product', async (req, res) => {
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

constructorRoute.get('/add/post-card', async (req, res) => {
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

constructorRoute.get('/inc/post-card', async (req, res) => {
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

constructorRoute.post('/style-image', upload.single("image-style"), async (req, res) => {
    try {
        const uploadedFileName = req.file.filename;
        res.status(200).json({ message: "Фото добавлено", fileName: uploadedFileName });
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});




export default constructorRoute