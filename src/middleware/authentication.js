/*import jwt from 'jsonwebtoken';
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
}*/
// src/middleware/authentication.js
// src/middleware/authentication.js
import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
    // Aplicamos exactamente la misma limpieza y fallback que en la firma
    const secret_key = (process.env.JWT_SECRET_KEY || 'CLAVE_TEMPORAL_DE_PRUEBA_123').trim(); 
    
    // LOG DE CONTROL: Verificamos la longitud en la verificación
    console.log(`[VERIFYING] Clave usada. Longitud: ${secret_key.length} caracteres.`);

    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            console.error("Fallo de autenticación detallado:", err.message); 
            return res.status(403).json({ message: 'Token inválido o expirado.' });
        }
        
        req.user = decoded; 
        next();
    });
};