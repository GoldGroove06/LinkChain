import { nodeTraversing } from "../automationController";
async function loop(gobalState, nodeData, automationObject) {
    let nextConditon;
    const nodeId = nodeData.id;
    console.log(nodeId)
    const startEdge = automationObject.edges.find((edge) => edge.source === nodeId && edge.sourceHandle === "loop");
    console.log(nodeData.data.noOfTimes)
    for(let i = 0; i <  2; i++) {
        console.log("loop",i)
        await nodeTraversing(automationObject, gobalState, startEdge, nodeId);
    }
    
    return {
        gobalState,
        nodeData,
        nextConditon
    }

    
}

export default loop;