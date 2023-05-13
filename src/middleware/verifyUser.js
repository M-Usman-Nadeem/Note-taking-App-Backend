import userModel from '../models/userRegisterSchema.js'
import bcrypt from 'bcrypt'
export async function verifyUser(req,res,next){
    const {email,password}=req.body;
    console.log(req.body,'Verify User')
    try{
        const userEmail=await userModel.findOne({email})
        if(userEmail) next()
       else res.end('Invalid Email')
        }catch(err){
console.log(err)        }
}