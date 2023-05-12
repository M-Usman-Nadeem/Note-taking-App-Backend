import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
// if(req.header)
console.log(req.header)
if(req.body.token){
    try{
let token=req.body.token
console.log('token',token)
let decodedToken=jwt.verify(token,"Secret Key")
console.log(decodedToken)

    }catch(err){

    }
}
};
