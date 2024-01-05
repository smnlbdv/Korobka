import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation/auth.js'
import verifyToken from '../validation/verifyToken.js'
import multer from 'multer'

const userRoute = Router()

userRoute.post('/upload-image', async (req, res) => {
    try {
        
        // res.json({
        //     url: `http://localhost:5000/avatar/${req.file.originalname}`,
        // })
    } catch (error) {
        console.log(error.message)
    }
})

export default userRoute