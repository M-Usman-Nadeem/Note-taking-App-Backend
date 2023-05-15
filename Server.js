import express from "express";
import cors from 'cors'
import {dbConnection} from './src/config/dbConfig.js'
import userRoutes from './src/routes/userRoutes.js'
import userGoalRoutes from './src/routes/userGoalRoutes.js'
import jwt from 'jsonwebtoken'
import userModel from "./src/models/userRegisterSchema.js";
const app=express();
app.use(express.json())
app.use(cors())
app.disable('x-powered-by') // donot let anyone know about the technologies used in production
dbConnection()
const port=8000;
app.use('/api',userRoutes)
app.use('/api',userGoalRoutes)

app.listen(port,(err)=>{
    console.log(err||'Server Connected')
})