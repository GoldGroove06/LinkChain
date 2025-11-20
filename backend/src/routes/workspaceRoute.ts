import { Router } from "express";
import { getWorkspace, postWorkspace } from "../controllers/workspaceController";
const workspaceRoute = Router()

workspaceRoute.get("/get", getWorkspace)
workspaceRoute.post("/new", postWorkspace)

export default workspaceRoute