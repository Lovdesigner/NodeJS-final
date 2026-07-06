import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret_key = process.env.JWT_SECRET_KEY;
// Protejo las rutas sensibles con el Middleware que verifica el token JWT
export const authentication = (req, res, next) => {
    //Bajo el Tk del header
  const token = req.headers['authorization'].split(" ")[1];

    if (!token) return res.sendStatus(401);
    //Lo verifico con la librería
    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}