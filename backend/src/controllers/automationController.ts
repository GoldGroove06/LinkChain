import { Workspace } from "../models/workspace";
import connectMongo from "../lib/connectMongo";
import { Automation } from "../models/automation";
import { Request, Response } from "express";

export async function getAutomation(req:Request,res:Response) {
    await connectMongo();
   
    const workspace = await Workspace.findById(req.params.id).exec();
    const automation = await Automation.find({parentWorkspace: workspace}).exec();
    return res.status(200).json({ message: "Automation", automation });
}

export async function postAutomation(req:Request,res:Response) {
    console.log(req.body)
    const workspace = await Workspace.findById(req.body.id).exec(); 
    const automation = await Automation.create({
        name: req.body.name,
        description: req.body.description,
        parentWorkspace: workspace
    });
    return res.status(200).json({ message: "Automation", body: req.body });
}

export async function deleteAutomation(req:Request,res:Response) {
    console.log(req.params.id);
    await connectMongo();
    const automation = await Automation.findByIdAndDelete(req.params.id).exec();
    return res.status(200).json({ message: "Automation deleted" });
}

export async function updateAutomation(req:Request,res:Response) {
    console.log(req.params.id);
    console.log(req.body, "from update");
    await connectMongo();
    const automation = await Automation.findByIdAndUpdate(req.params.id, req.body).exec();
    return res.status(200).json({ message: "Automation updated" });
}

export async function getAutomationTree(req:Request,res:Response) {
    const id = req.params.id;
    await connectMongo();
    const automation = await Automation.findById(id).exec();
    console.log("automation tree fetch",automation);
    return res.status(200).json({ message: "Automation", automation });
}