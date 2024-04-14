import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import verifyToken from '../validation/verifyToken.js'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Product from '../models/Product.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/product");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });
  
const adminRoute = Router();
  
adminRoute.post('/add', verifyToken, upload.any(), async (req, res) => {
  try {
    let img;
    const slider = [];

    req.files.forEach((file, index) => {
        if (index === 0) {
            img = `http://localhost:5000/product/${file.originalname}`;
        } else {
            slider.push(file.originalname);
        }
    });

    const newProduct = new Product({
          img,
          slider,
          ...req.body
    });

    console.log(newProdcut);

    const newProdcut = await newProduct.save();
    
    // res.status(202).json({
    //     message: "Товар успешно добавлен",
    //     newProdcut
    // })

  } catch (error) {
    // res.status(500).json({
    //   message: "Не удалось добавить товар. Пожалуйста, попробуйте еще раз."
    // });
  }
});

adminRoute.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(id)

    if(deleteProduct) {
      res.status(202).json({
        message: "Товар успешно удален из БД"
      })
    } else {
      res.status(500).json({
        message: "Не удалось удалить товар"
      })
    }

  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить товар из БД"
    });
  }
});


export default adminRoute