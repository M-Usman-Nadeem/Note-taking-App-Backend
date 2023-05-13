import userRegisterModel from "../models/userRegisterSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
async function doRegisterUser(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const user = new userRegisterModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id, email, iat: 10 }, "Secret Key");
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

  try {
    const user = await userRegisterModel.findOne({ email });
    const result = await bcrypt.compare(myPlaintextPassword, user.password);
    console.log(result, "result");
    if (result) {
      const token = jwt.sign({ id: user._id, email }, "Secret Key");
      res.json({
        message: "login Success",
        email,
        password,
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
async function doVerifyEmail(req,res,next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'usmanprg9@gmail.com',
        pass:'puxzqlxqdcetnidh'
    }
});
  
const token = jwt.sign({
        data: 'Token Data' 
    }, 'ourSecretKey', { expiresIn: '10m' }  
);    
  
const mailConfigurations = {
  
    // It should be a string of sender/server email
    from: 'usmanprg9@gmail.com',
  
    to: 'mu538183@gmail.com',
  
    // Subject of Email
    subject: 'Email Verification',
      
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://192.168.50.65:8000/verify/${token}
           Thanks`,
         
      
};
  
transporter.sendMail(mailConfigurations, function(error, info){
    if (error) console.log(error);
    console.log('Email Sent Successfully');
    console.log(info);
  
});
res.end('Email Sent Successfully')
}

export { doLogin, doRegisterUser, doVerifyEmail };
