import { Schema,model } from "mongoose";

const RegisterSchema = new Schema({
  name: {  type:String,required: true, trim: true, default: "", },
  email: { type:String,
    required: true,
    uniquie: true,
    trim: true, default: "",
  },
  password:{
    type:String,
    required:true, default: "",
  },
  
});
export default model.Users || model('Users',RegisterSchema)
