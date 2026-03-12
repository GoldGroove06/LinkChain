import { Router } from "express";
import { postWebhook } from "../controllers/webhookController";

const webhookRoute = Router()

webhookRoute.post("/:id", postWebhook)

export default webhookRoute