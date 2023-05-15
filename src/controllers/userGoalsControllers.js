import userGoals from '../models/userGoalsSchema.js'
const addGoals= async(req,res,next)=>{
console.log('add goals')


const {token,...rest}=req.body;
    const userData=new userGoals({user:req.user.id,...rest})
    await userData.save()
res.end('saved') 
}
async function getGoals(req,res,next){
const data=await userGoals.find({user:req.user.id})
res.json(data)
}
export  {addGoals,getGoals}