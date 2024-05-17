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

export async function saveToken (userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId: userId })

    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save()
    } else {
        const token = await TokenModel.create({ userId: userId, refreshToken: refreshToken})
        return token
    }
}

export async function removeToken (refreshToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken: refreshToken})
    return tokenData
}

