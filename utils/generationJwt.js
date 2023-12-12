import jwtToken from 'jsonwebtoken'

const generationToken = (userId) => {

    const jwtSecret = 'ssdjksdlfksjdflkjdflkjdflkjdk'

    const token = jwtToken.sign(
        {userId: userId}, 
        jwtSecret,
        {expiresIn: '1h'}
    )

    return token
}

export default generationToken