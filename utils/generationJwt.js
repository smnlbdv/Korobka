import jwtToken from 'jsonwebtoken'

const generationToken = (userId, role) => {

    const jwtSecret = 'ssdjksdlfksjdflkjdflkjdflkjdk'

    const token = jwtToken.sign(
        {userId: userId, role: role}, 
        jwtSecret,
        {expiresIn: '1h'}
    )

    return token
}

export default generationToken