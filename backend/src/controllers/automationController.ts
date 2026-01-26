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

let globalState = {};

export async function execEngine(graph, NodeId){
    console.log("global state", globalState)
    const currentNode = graph.nodeMap.get(NodeId)
    let nCondition
    // console.log(graph.nodeMap)
    // console.log("currentNode",currentNode)
    if (currentNode.type === "manualTrigger") {
        nCondition = "b"
    }

    if (currentNode.type === "setData") {
        console.log("yeah")
        const {nextConditon} = await setData(globalState, currentNode);
        nCondition = nextConditon
    } else if (currentNode.type === "ifCondition") {
        const {nextConditon} = await ifCondition(globalState, currentNode);
        nCondition = nextConditon
    } else if (currentNode.type === "delay") {
        const {nextConditon} = await delay(globalState, currentNode);
        nCondition = nextConditon
    } else if (currentNode.type === "loop") {
        const {nextConditon} = await loop(globalState, currentNode);
        nCondition = nextConditon
    }

    if (currentNode.nextNode.length === 0) {
        return graph
    }

    for (const nextNode of currentNode.nextNode) {
        if (nextNode.sourceHandle === nCondition) {
            // console.log("nextNode",nextNode)
            await execEngine(graph, nextNode.target)
        }
        
    }
    
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
        const tempDict = []
        const nextNodes = automation.edges.filter((edge) => edge.source === node.id);
        for (const nextNode of nextNodes) {
            tempDict.push({
                sourceHandle: nextNode.sourceHandle,
                target: nextNode.target
            })
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

    // console.log(compliedGraph.nodeMap)
    // console.log(nodeMap)

    const outputExecEngine = await execEngine(compliedGraph, startNodeId)


    return res.status(200).json({ message: "Automation executed", automation });
}