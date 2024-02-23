import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import verifyToken from '../validation/verifyToken.js'
import { registerValidation, loginValidation } from './../validation/auth.js'

import Category from '../models/Category.js'

  
const category = Router();
  
category.get('/all', async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(202).json({
        categories: allCategories
    })
  } catch (error) {
    res.status(500).json({
      message: "Не удалось добавить достать категории"
    });
  }
});




export default category