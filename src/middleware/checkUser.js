import userModel from '../models/userRegisterSchema.js'

async function checkUser(req,res,next){
    const {name,email}=req.body;
    try{
        const userEmail=await userModel.findOne({email})
        if(userEmail) return res.end('Already Registered')
        const userName=await userModel.findOne({name})
        if(userName) return res.end('User Name Already Exists.')
        next()
        }catch(err){
console.log(err)        }
}
export {checkUser}