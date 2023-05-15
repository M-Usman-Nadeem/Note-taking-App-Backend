import {Router} from 'express'
import { auth } from '../middleware/auth.js'
import { addGoals,getGoals } from '../controllers/userGoalsControllers.js'
const routes=Router()

routes.post('/goals',auth,addGoals)
routes.get('/goals',auth,getGoals)
export default routes