import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import User from '../models/User.js'
import { validationResult } from 'express-validator'

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

        const { name, email, password} = req.body

        const isUser = await User.findOne({email})

        if(isUser) {
            return res.status(300).json({message: "Такой email уже существует"})
        } else {

            const passwordHash = await bcrypt.hash(password, 12)

            const user = new User({
                name,
                email,
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

        const isMatch = bcrypt.compare(password, user.passwordHash)

        if(!isMatch) {
            return res.status(400).json({message: "Пароли не совпадают"})
        }

        const jwtSecret = 'ssdjksdlfksjdflkjdflkjdflkjdk' //лучше вынести ключ в .env

        const token = jwtToken.sign(
            {userId: user.id}, 
            jwtSecret,
            {expiresIn: '1h'}
        )

        res.json({
            token,
            userId: user.id
        })

    } catch (error) {
        console.log(error)
    }
})


export default router