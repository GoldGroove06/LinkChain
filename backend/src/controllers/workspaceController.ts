import connectMongo from "../lib/connectMongo";
import { Workspace } from "../models/workspace";
import { User } from "../models/user";
import { Request, Response } from "express";

export async function getWorkspace(req:Request,res:Response) {
    console.log(req.user);
    const { id, email } = req.user as { id: string , email: string };
    connectMongo();
    const user = await User.findOne({ email }).exec();
    const workspace = await Workspace.find({ parentUser: user?._id }).exec();
    console.log(workspace);
    return res.status(200).json({ workspace });
}

export async function postWorkspace(req:Request,res:Response) {
    const { id, email } = req.user as { id: string , email: string };
    connectMongo();
    console.log("workspace Post")
    const user = await User.findOne({ email }).exec();

     await Workspace.create(
        {
            name: req.body.name,
            description: req.body.description,
            parentUser: user?._id
        }
    )
    
    console.log("workspace created")
    return res.status(200).json({ message: "Workspace created" });
}