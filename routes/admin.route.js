import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
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
  
  adminRoute.post('/add',  upload.any(), async (req, res) => {
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

      await newProduct.save();

    } catch (error) {
      console.log(error.message);
    }
  });


export default adminRoute