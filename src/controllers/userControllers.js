import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../models/userRegisterSchema.js";
const saltRounds = 10;
async function hashedPassword(password){
  const hashedPass = await bcrypt.hash(password, saltRounds);
  console.log(hashedPass)
  return hashedPass
}
async function doRegisterUser(req, res, next) {
  const { name, email, password } = req.body;

  try {

    const user = new userModel({
      name,
      email,
      password: hashedPassword(password),
    });
    await user.save();
    const token = jwt.sign({ id: user._id, email }, "Secret Key");
    res.json({
      message: "doRegisterUser Success",
      token,
    });
  } catch (err) {
    console.log(err);
  }
}
async function doLogin(req, res, next) {
  const { email, password } = req.body;
console.log(req.body)
  try {
    const user = await userModel.findOne({ email });
    const result = await bcrypt.compare(password, user.password);
    console.log(result, "result");
    if (result) {
      const token = jwt.sign({ id: user._id, email }, "Secret Key");
      console.log(token)
      res.json({
        message: "login Success",
        email,
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

const getRandomPin = (chars, len)=>[...Array(len)].map(
  (i)=>chars[Math.floor(Math.random()*chars.length)]
).join('');


//use it like this
async function doVerifyEmail(req, res, next) {
  console.log(req.params)
  const userEmail=await userModel.findOne({email:req.params.email})
  if(userEmail){

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "usmanprg9@gmail.com",
      pass: "puxzqlxqdcetnidh",
    },
  });
const number=getRandomPin('0123456789',4);
 

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "usmanprg9@gmail.com",

    to: req.params.email ,

    subject: "Email Verification",

    text:`${number}`
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) console.log(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
  res.json({
         Otp:number,
    success: true,
  });
  }else{
  res.end('user is not registered ')
  }
}
async function doUpdatePassword(req,res,next){
  const {email,password}=req.body
  console.log(req.body)
const hashedPass= await hashedPassword(password)
console.log(hashedPass,'hashedOne')
  const user=await userModel.updateOne({email},{$set:{password:hashedPass}})
  res.json({success:true})
  

}
export { doLogin, doRegisterUser, doVerifyEmail ,doUpdatePassword};
