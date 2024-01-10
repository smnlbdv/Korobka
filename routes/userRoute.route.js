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
            res.status(201).json({
                name: item.name,
                surname: item.surname,
                email: item.email,
                phone: item.phone,
                status: item.status,
                avatarUser: item.avatarUser
            })
        })
        .catch(error => res.status(400).json({error: error}))
})

userRoute.post('/upload-image', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const userId = req.userId
        const url = `http://localhost:5000/avatar/${req.file.originalname}`

        await User.findByIdAndUpdate({_id: userId}, {avatarUser: url}, { new: true })
                .then(() => {
                    res.status(201).json({
                        message: "Фото успешно сохранено",
                        url: url,
                    })
                })
                .catch(error => res.status(400).json({message: "Ошибка сохранения данных"}))
    } catch (error) {
        res.status(400).json({error: error})
    }
})

userRoute.post('/update', verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        const body = req.body

        if(body.email) {
            const email = await User.findOne({email: body.email})
            email ? res.status(409).json({message: "Такая почта уже существует"}) : 
                await User.updateOne({_id: userId}, body, { new: true })
                .then(() => {
                    res.status(201).json({
                        message: "Данные успешно сохранены"
                    })
                })
                .catch(error => res.status(400).json({message: "Ошибка сохранения данных"}))
        }
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

export default userRoute