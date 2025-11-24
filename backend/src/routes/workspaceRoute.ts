import { Router } from "express";
import { getWorkspace, postWorkspace, deleteWorkspace } from "../controllers/workspaceController";
const workspaceRoute = Router()

workspaceRoute.get("/get", getWorkspace)
workspaceRoute.post("/new", postWorkspace)
workspaceRoute.delete("/delete/:id", deleteWorkspace)

export default workspaceRoute