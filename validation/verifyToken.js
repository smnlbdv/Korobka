
import jwt from 'jsonwebtoken';
import generationToken from '../utils/generationJwt.js';
import cookieParser from 'cookie-parser';

const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Ошибка авторизации' });
  }

  try {
    const decodedToken = jwt.verify(token, 'ssdjksdlfksjdflkjdflkjdflkjdk');
    const currentTime = Math.round(new Date().getTime() / 1000);

    if (decodedToken.exp <= currentTime) {
      return res.status(401).json({ message: 'Время токена истекло' });
    } else {
      req.userId = decodedToken.userId
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен авторизации' });
  }
  
};

export default verifyToken