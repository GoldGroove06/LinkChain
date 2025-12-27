import { Router } from "express";
import { getAutomation, postAutomation, deleteAutomation, updateAutomation, getAutomationTree, runAutomation } from "../controllers/automationController";
const automationRoute = Router()


automationRoute.get("/get/:id", getAutomation)
automationRoute.get("/tree/:id", getAutomationTree)
automationRoute.put("/update/:id", updateAutomation)
automationRoute.post("/new", postAutomation)
automationRoute.delete("/delete/:id", deleteAutomation)
automationRoute.post("/run/:id", runAutomation)

export default automationRoute