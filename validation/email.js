import { body } from 'express-validator';

const emailValidation = [
  body('email').isEmail()
];

export default emailValidation;
