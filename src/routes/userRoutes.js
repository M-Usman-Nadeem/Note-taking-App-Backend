import {Router} from 'express'
const routes=Router()
import {auth} from '../middleware/auth.js'
import { checkUser } from '../middleware/checkUser.js'
import {verifyUser} from '../middleware/verifyUser.js'
import { doLogin,doRegisterUser,doVerifyEmail } from '../controllers/userControllers.js'
routes.post('/register',checkUser,doRegisterUser)
routes.post('/login',verifyUser,doLogin)
routes.get('/verifyEmail',doVerifyEmail)
export default routes