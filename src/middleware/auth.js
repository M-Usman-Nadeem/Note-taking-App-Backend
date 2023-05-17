import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
// if(req.header)
console.log('auth')
if(req.body.token || req.params.token){
    try{
let token=req.body.token || req.params.token;
let decodedToken=jwt.verify(token,"Secret Key");
req.user=decodedToken

    
next()
    }catch(err){

    }
}
};
