import { Workspace } from "../models/workspace";
import connectMongo from "../lib/connectMongo";
import { Automation } from "../models/automation";
import { Request, Response } from "express";
import setData from "./nodes/setData";
import ifCondition from "./nodes/ifCondition";
import delay from "./nodes/delay";
import loop from "./nodes/loop";

export async function getAutomation(req: Request, res: Response) {
    await connectMongo();

    const workspace = await Workspace.findById(req.params.id).exec();
    const automation = await Automation.find({ parentWorkspace: workspace }).exec();
    return res.status(200).json({ message: "Automation", automation });
}

export async function postAutomation(req: Request, res: Response) {
    // console.log(req.body)
    const workspace = await Workspace.findById(req.body.id).exec();
    const automation = await Automation.create({
        name: req.body.name,
        description: req.body.description,
        parentWorkspace: workspace
    });
    return res.status(200).json({ message: "Automation", body: req.body });
}

export async function deleteAutomation(req: Request, res: Response) {
    // console.log(req.params.id);
    await connectMongo();
    const automation = await Automation.findByIdAndDelete(req.params.id).exec();
    return res.status(200).json({ message: "Automation deleted" });
}

export async function updateAutomation(req: Request, res: Response) {
    // console.log(req.params.id);
    // console.log(req.body, "from update");
    await connectMongo();
    const automation = await Automation.findByIdAndUpdate(req.params.id, req.body).exec();
    return res.status(200).json({ message: "Automation updated" });
}

export async function getAutomationTree(req: Request, res: Response) {
    const id = req.params.id;
    await connectMongo();
    const automation = await Automation.findById(id).exec();
    // console.log("automation tree fetch",automation);
    return res.status(200).json({ message: "Automation", automation });
}


export async function runAutomation(req: Request, res: Response) {
    const id = req.params.id;
    const startNodeId = req.body.nodeId;
    await connectMongo();
    const automation = await Automation.findById(id).exec();


    // console.log("automation tree fetch",automation.nodes, automation.edges);
    let nodeMap
    let compliedGraph ={}
    // making a node map or graph 

    nodeMap = new Map();
    for (const node of automation.nodes) {
        const tempDict = {}
        const nextNodes = automation.edges.filter((edge) => edge.source === node.id);
        for (const nextNode of nextNodes) {
            tempDict[nextNode.sourceHandle] = nextNode.target
        }
        nodeMap.set(node.id, {
            id: node.id,
            data: node.data,
            type: node.type,
            nextNode: tempDict
        });

        if (node.type === "manualTrigger"){
            compliedGraph['startNodeId'] = node.id
        }
    }

    compliedGraph['nodeMap'] = nodeMap

    console.log(compliedGraph)
    // console.log(nodeMap)


    return res.status(200).json({ message: "Automation executed", automation });
}