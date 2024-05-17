import jwtToken from 'jsonwebtoken'

import TokenModel from '../models/Token.js'

export function generationToken (payload) {

    const accessToken = jwtToken.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
    const refreshToken = jwtToken.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

    return { 
        accessToken,
        refreshToken
    }
}


