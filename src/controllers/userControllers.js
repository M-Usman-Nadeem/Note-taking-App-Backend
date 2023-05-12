import userRegisterModel from "../models/userRegisterSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    //    console.log(result,'result')
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
export { doLogin, doRegisterUser };
