import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation/auth.js'
import verifyToken from '../validation/verifyToken.js'
import multer from 'multer'

import User from '../models/User.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage:storage })
const userRoute = Router()

userRoute.get('/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId
    await User.findOne({_id: userId})
        .then(item => {
            res.status(201).json(item)
        })
        .catch(error => res.status(400).json({error: error}))
})

userRoute.post('/upload-image', verifyToken, upload.single('image'), async (req, res) => {
    try {
        res.json({
            url: `http://localhost:5000/avatar/${req.file.originalname}`,
        })
    } catch (error) {
        console.log(error.message)
    }
})

export default userRoute