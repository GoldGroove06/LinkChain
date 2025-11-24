import { Router } from "express";
import { getAutomation, postAutomation, deleteAutomation } from "../controllers/automationController";
const automationRoute = Router()


automationRoute.get("/get", getAutomation)
automationRoute.post("/new", postAutomation)
automationRoute.delete("/delete/:id", deleteAutomation)

export default automationRoute