import {body} from 'express-validator'

export const registerValidation = [
    body('name').isLength({min: 6}),
    body('email').isEmail(),
    body('passwordHash').isLength({min: 6}),
]