import mongoose from "mongoose";

export async function dbConnection(){

    try{
  const dbConnection=     await mongoose.connect('mongodb://127.0.0.1:27017/NoteApp')
  console.log('db Connected')
    }catch(err){
        console.log(err)
    }
}
 