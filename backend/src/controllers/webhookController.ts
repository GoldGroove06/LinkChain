import { Request, Response } from "express";
import connectMongo from "../lib/connectMongo";
import { Automation } from "../models/automation";
import { execEngineStater } from "./automationController";


export async function postWebhook(req: Request, res: Response) {
    await connectMongo();
    // console.log(req.params)
    const autoId = req.params.id.toString().split("-")[0];
    // console.log(autoId)
    const automation = await Automation.findById(autoId).exec();
    // console.log(automation)

    automation.nodes.forEach((node) => {
        // console.log(node)
        if (node.type === "webhook") {
            if (node.data.url.toString().split("/")[4] === req.params.id) {
                console.log(node.id)
                execEngineStater(autoId, node.id)
                console.log("started")
            }
        }
    })
    return res.status(200).json({ message: "Webhook" });
}