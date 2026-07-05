import express from "express";
import cors from "cors";
import 'dotenv/config';
import productsRouter from './src/routes/products.routes.js';
import loginRoutes from "./src/routes/auth.routes.js"

const app = express();

// Configuración de CORS 
app.use(cors({
    origin: "*", // Con el (*) dejo que cualquier url acceda al back
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

// Compenzo la utilización de body-pharse con este (baja la data del body y lo transformo en JSon)
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.use(loginRoutes);

app.use("/api", productsRouter);

app.use(function (req, res, next) {
    res.status(404)
    res.send("ruta no encontrada")
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})