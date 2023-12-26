import {Router} from 'express'
import ReactDOMServer from 'react-dom/server';
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import { registerValidation, loginValidation } from './../validation/auth.js'

import verifyToken from '../validation/verifyToken.js'
import sendEmail from '../utils/mailer.js'
import fs from 'fs' 

const emailRoute = Router()

emailRoute.post('/send', verifyToken, async (req, res) => {
    try {
        const subject = 'Подписка на новости оформлена!'; // Тема письма
        const html = fs.readFileSync('template/email/email.html', 'utf8');
        sendEmail(req.body.email, subject, html); 

    } catch (error) {
        console.log(error.message)
    }
}) 

export default emailRoute