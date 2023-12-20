
import jwt from 'jsonwebtoken';
import generationToken from '../utils/generationJwt.js';

const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Ошибка авторизации' });
  }
  try {
    const decodedToken = jwt.verify(token, 'ssdjksdlfksjdflkjdflkjdflkjdk');
    console.log(decodedToken)
    if (decodedToken.exp < Date.now()) {
      req.token = generationToken(decodedToken.userId);
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен авторизации' });
  }
};

export default verifyToken