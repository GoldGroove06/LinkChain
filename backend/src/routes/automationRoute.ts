import { Router } from "express";
import { getAutomation, postAutomation } from "../controllers/automationController";
const automationRoute = Router()


automationRoute.get("/get", getAutomation)
automationRoute.post("/new", postAutomation)

export default automationRoute