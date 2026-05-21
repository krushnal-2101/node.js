import express from 'express';
import path from "path";
import dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import connectDB from './config/db.js';

dotenv.config()

const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app  = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', authRoutes);
app.use('/products', productsRoutes);
app.use('/category', categoryRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the product API', routes: ['/register', '/login', '/me', '/products', '/categories'] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


export default app;  