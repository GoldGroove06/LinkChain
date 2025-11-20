import connectMongo from "../lib/connectMongo";
import { Automation } from "../models/automation";
import { Request, Response } from "express";

export async function getAutomation(req:Request,res:Response) {

    return res.status(200).json({ message: "Automation" });
}

export async function postAutomation(req:Request,res:Response) {
    console.log(req.body);
    return res.status(200).json({ message: "Automation", body: req.body });
}