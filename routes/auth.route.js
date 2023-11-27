import Router from 'express'
import mongoose from 'mongoose'
import User from '../models/User.js'

const router = Router()

router.post('/registration', async (req, res) => {
    try {

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
        console.log(error.message)
    }
})

export default router