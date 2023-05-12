import express from "express";
import cors from 'cors'
import {dbConnection} from './src/config/dbConfig.js'

import userRoutes from './src/routes/userRoutes.js' 
const app=express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by') // donot let anyone know about the technologies used in production
dbConnection()
const port=8000;
app.use('/api',userRoutes)
app.listen(port,(err)=>{
    console.log(err||'Server Connected')
})