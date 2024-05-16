import {Router} from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import * as uuid  from 'uuid';
import dotev from 'dotenv'
dotev.config()

import User from '../models/User.js'
import Email from '../models/Email.js'
import { validationResult } from 'express-validator'
import { registerValidation, loginValidation } from './../validation/auth.js'
import { generationToken, saveToken } from '../utils/generationJwt.js'
import { sendActivationLink } from '../utils/mailer.js'

const auth = Router()

auth.post('/registration', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        const { name, email, surname, password} = req.body

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации",
            })
        }

        const isEmail = await Email.findOne({email})

        if(isEmail) {
            return res.status(300).json({message: "Такой email уже существует"})
        } else {

            const passwordHash = await bcrypt.hash(password, 12)
            const activationLink = uuid.v4()
            const newEmail = await Email.create({email: email})
            const user = await User.create(
                {
                    name,
                    email: newEmail._id,
                    surname,
                    passwordHash: passwordHash,
                    activationLink
                }
            )

            sendActivationLink(email, `${process.env.API_URL}/api/profile/activate/${activationLink}`)
            res.status(200).json({message: "Пользователь успешно создан"});
        }

    } catch (error) {
        console.log(error.message)
    }
})

auth.post('/login', loginValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Не корректные данные при авторизации",
            })
        }

        const { email, password } = req.body
        const isEmail = await Email.findOne({email})

        if(!isEmail) {
            return res.status(400).json({message: "Такого email не существует"})
        }

        const user = await User.findOne({email: isEmail._id})
        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if(!isMatch) {
            return res.status(400).json({message: "Ошибка авторизации"})
        }

        const tokens = generationToken({userId: user._id, email: email, isActivated: user.isActivated, role: user.role})
        await saveToken(user._id, tokens.refreshToken)

        res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true })
        
        res.status(200).json({
            message: "Авторизация прошла успешно",
            accessToken: tokens.accessToken,
            id: user._id, 
            role: user.role
        });

    } catch (error) {
        console.log(error)
    }
})

auth.get('/admin/:userId', async (req, res) => {
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


export default auth