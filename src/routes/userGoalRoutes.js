import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  addGoals,
  getGoals,
  updateGoals,
} from "../controllers/userGoalsControllers.js";
const routes = Router();

routes.route("/user/goals").put(auth, updateGoals).post(auth, addGoals);
routes.get("/user/goals/:token", auth, getGoals);

export default routes;
