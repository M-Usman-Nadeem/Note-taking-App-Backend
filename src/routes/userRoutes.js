import {Router} from 'express'
const routes=Router()
import {auth} from '../middleware/auth.js'
import { checkUser } from '../middleware/checkUser.js'
import {verifyUser} from '../middleware/verifyUser.js'
import { doLogin,doRegisterUser } from '../controllers/userControllers.js'
routes.post('/register',checkUser,doRegisterUser)
routes.post('/login',auth,verifyUser,doLogin)
export default routes