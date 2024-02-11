import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import User from '../models/User.js'
import { validationResult } from 'express-validator'
import generationToken from '../utils/generationJwt.js'

const router = Router()

router.post('/registration', registerValidation, async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Не корректные данные при регисрации",
            })
        }

        const { name, email, surname, password} = req.body

        const isUser = await User.findOne({email})

        if(isUser) {
            return res.status(300).json({message: "Такой email уже существует"})
        } else {

            const passwordHash = await bcrypt.hash(password, 12)

            const user = new User({
                name,
                email,
                surname,
                passwordHash: passwordHash
            })
            await user.save()
        }

        res.status(200).json({message: "Пользователь успешно создан"})

    } catch (error) {
        console.log(error.message)
    }
})

router.post('/login', loginValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Не корректные данные при авторизации",
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "Такого email не существует"})
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if(!isMatch) {
            return res.status(400).json({message: "Пароли не совпадают"})
        }

        const token = generationToken(user.id, user.role)

        res.json({
            token,
            userId: user.id,
            role: user.role
        })

    } catch (error) {
        console.log(error)
    }
})

router.get('/admin/:userId', async (req, res) => {
    try {
        const response = req.params.userId
        
        await User.findOne({_id: response})
                  .then((user) => {
                    if(user.role == 1) {
                        res.status(200).json({message: true})
                    } else {
                        res.status(400).json({message: "Вы не админ"})
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })
    } catch (error) {
        console.log(error)
    }
})


export default router