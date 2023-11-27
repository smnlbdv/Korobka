import Router from 'express'
import mongoose from 'mongoose'
import { registerValidation } from './../validation/auth.js'

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

            const { name, email, passwordHash} = req.body

            const isUser = await User.findOne({email})

            if(isUser) {
                return res.status(300).json({message: "Такой e-mail уже существует"})
            } else {
                const user = new User({
                    name,
                    email,
                    passwordHash
                })
                await user.save()
            }

            res.status(200).json({message: "Пользователь успешно создан"})

        } catch (error) {
            console.log(error)
        }
    })

export default router