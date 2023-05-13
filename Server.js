import express from "express";
import cors from 'cors'
import {dbConnection} from './src/config/dbConfig.js'
import userRoutes from './src/routes/userRoutes.js'
import jwt from 'jsonwebtoken'
const app=express();
app.use(express.json())
app.use(cors())
app.disable('x-powered-by') // donot let anyone know about the technologies used in production
dbConnection()
const port=8000;
app.use('/api',userRoutes)
app.get('/verify/:token', (req, res)=>{
    const {token} = req.params;
    // Verifying the JWT token   
    jwt.verify(token, 'ourSecretKey', function(err, decoded) {
        if (err) {
            console.log(err,'ERrrrrrrrrs');
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
        else {
            res.send("Email verifified successfully");
        }
    });
});
app.listen(port,(err)=>{
    console.log(err||'Server Connected')
})