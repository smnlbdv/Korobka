import {Router} from 'express'
import ReactDOMServer from 'react-dom/server';
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import verifyToken from '../validation/verifyToken.js'
import sendEmail from '../utils/mailer.js'
import fs from 'fs' 
import Email from '../models/Email.js'

const emailRoute = Router()

emailRoute.post('/send', verifyToken, async (req, res) => {
    try {
        const resultEmailSend = await Email.findOne({email: req.body.email})
        if(resultEmailSend) {
            res.status(400).json({
                message: "Подписка уже оформлена"
            })
        } else {
            const subject = 'Подписка на новости оформлена!'; 
            const html = fs.readFileSync('template/email/email.html', 'utf8');
            const resultEmail = sendEmail(req.body.email, subject, html); 
            if(resultEmail) {
                await Email.insertMany({email: req.body.email})
                            .then (() => {
                                res.status(202).json({
                                    message: "Теперь вы будете получать самые интересные предложения первыми. Подтверждение отправлено на указанный e-mail"
                                })
                            })
            } else {
                res.status(400).json({
                    message: "Указаны неверные данные"
                })
            }
        }

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}) 

export default emailRoute