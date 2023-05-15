import {Router} from 'express'
import { auth } from '../middleware/auth.js'
import { getGoals } from '../controllers/userGoalsControllers.js'
const routes=Router()

routes.get('/goals',auth,getGoals)
export default routes