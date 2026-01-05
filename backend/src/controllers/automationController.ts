import { Workspace } from "../models/workspace";
import connectMongo from "../lib/connectMongo";
import { Automation } from "../models/automation";
import { Request, Response } from "express";
import setData from "./nodes/setData";
import ifCondition from "./nodes/ifCondition";
import delay from "./nodes/delay";
import loop from "./nodes/loop";

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

export function nodeTraversing(automationObject, gobalState, startEdge, exitNodeId){
        console.log("entering the node traversing function")
        // const startEdge = automation.edges.find((edge) => edge.source === startNodeId);
        let nextNode = 1;
        let currentEdge = startEdge
        while(nextNode){
            // console.log("while loop")
            // console.log(nextNode)
            console.log("exit node check", nextNode.id === exitNodeId)
            if (nextNode.id === exitNodeId) return ;
            console.log("next node console",nextNode)
            nextNode = automationObject.nodes.find((node) => node.id === currentEdge.target);
            currentEdge = automationObject.edges.find((edge) => edge.source === nextNode.id);
            switch(nextNode.type) {
                case "setData":
                    // console.log("setData")
                    setData(gobalState, nextNode, automationObject)
                    break;
                case "ifCondition":
                    const { nextConditon } = ifCondition(gobalState, nextNode, automationObject);
                    if (nextConditon === "true") {
                        break;
                    }
                    else {
                        return { message: "Automation", consoleData: "false", gobalState };
                    }
                
                case "delay":
                    delay(gobalState, nextNode, automationObject)
                    break;

                case "loop":
                    loop(gobalState, nextNode, automationObject)
                    
                case "console":
                    return { message: "Automation", consoleData: "true", gobalState };
            }
        }
    }


export async function runAutomation(req:Request,res:Response) {
    const id = req.params.id;
    const  startNodeId = req.body.nodeId;
    await connectMongo();
    const automation = await Automation.findById(id).exec();


    console.log("automation tree fetch",automation.nodes, automation.edges);
    //v0 of automation engine
    // const startEdge = automation.edges.find((edge) => edge.source === startNodeId);


    // let nextNode: any;
    // let currentEdge = startEdge
    // let gobalState: any = {};
    // for(let i = 0; i < automation.nodes.length - 1 ; i++) {
    //     nextNode = automation.nodes.find((node) => node.id === currentEdge.target);
    //     currentEdge = automation.edges.find((edge) => edge.source === nextNode.id);
    //     console.log(nextNode, i)
    //     switch(nextNode.type) {
    //         case "setData":
    //             // gobalState = {...gobalState, [nextNode.data.variable]: nextNode.data.variableValue}
    //             break;
    //         case "ifLoop":
    //             if (!nextNode.data.condition) {
    //                 break;
    //             }
    //             else {
    //                 return res.status(200).json({ message: "Automation", consoleData: "false" });
    //             }
                
    //         case "console":
    //             return res.status(200).json({ message: "Automation", consoleData: "true" });
    //     }
        
    // }
    

    
    //v1 of automation engine
     const startEdge = automation.edges.find((edge) => edge.source === startNodeId);


    let nextNode: any;
    let currentEdge = startEdge
    let gobalState: any = {};
    const result = nodeTraversing(automation, gobalState, startEdge, null)
    console.log(result)
        // for(let i = 0; i < automation.nodes.length - 1 ; i++) {
    //     nextNode = automation.nodes.find((node) => node.id === currentEdge.target);
    //     currentEdge = automation.edges.find((edge) => edge.source === nextNode.id);
    //     console.log(nextNode, i)
        
    //     switch(nextNode.type) {
    //         case "setData":
    //             setData(gobalState, nextNode)
    //             break;
    //         case "ifCondition":
    //             const { nextConditon } = ifCondition(gobalState, nextNode);
    //             if (nextConditon === "true") {
    //                 break;
    //             }
    //             else {
    //                 return res.status(200).json({ message: "Automation", consoleData: "false", gobalState });
    //             }
                
                
    //         case "console":
    //             return res.status(200).json({ message: "Automation", consoleData: "true", gobalState });
    //     }   
    // }

    
    return res.status(200).json({ message: "Automation executed", automation  });
}