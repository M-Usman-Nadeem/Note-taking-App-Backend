import {Router} from 'express'
const routes=Router()
import {auth} from '../middleware/auth.js'
import { checkUser } from '../middleware/checkUser.js'
import {verifyUser} from '../middleware/verifyUser.js'
import { doLogin,doRegisterUser,doVerifyEmail,doUpdatePassword } from '../controllers/userControllers.js'
routes.post('/register',checkUser,doRegisterUser)
routes.post('/login',verifyUser,doLogin)
routes.get('/verifyEmail/:email',doVerifyEmail)
routes.put('/updatePassword',doUpdatePassword)
export default routes