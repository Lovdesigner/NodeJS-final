/*import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (userData) => {
    const user = { id: userData.id, email: userData.email };
    const expiration = { expiresIn: '1h' };
    return jwt.sign(user, secret_key, expiration);
}*/

// src/data/token.js
// src/data/token.js
import jwt from 'jsonwebtoken';

export const generateToken = (userData) => {
    // Forzamos un .trim() para limpiar espacios. Si da undefined, usamos un fallback seguro para testear.
    const secret_key = (process.env.JWT_SECRET_KEY || 'CLAVE_TEMPORAL_DE_PRUEBA_123').trim(); 
    
    // LOG DE CONTROL: Verificamos en consola la longitud exacta de la clave usada para firmar
    console.log(`[SIGNING] Clave usada. Longitud: ${secret_key.length} caracteres.`);

    const user = { id: userData.id, email: userData.email };
    const expiration = { expiresIn: '1h' };
    
    return jwt.sign(user, secret_key, expiration);
};