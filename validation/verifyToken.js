
import jwt from 'jsonwebtoken';
import dotev from 'dotenv'
dotev.config()

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(422).json({ message: 'Не авторизован', redirectTo: "/api/auth/login" });
  }

  try {
    const decodedToken = jwt.decode(token);

    if (decodedToken.exp <= currentTime) {
      return res.status(401).json({ message: 'Время токена истекло' });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    if (!verifiedToken) {
      req.userId = verifiedToken.userId;
      next();
    }

  } catch (error) {
    return res.status(422).json({ message: 'Не авторизован', redirectTo: "/api/auth/login" });
  }
  
};

export default verifyToken