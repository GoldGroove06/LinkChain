async function loop(gobalState, nodeData) {
    console.log(gobalState)
    if(!gobalState["loop"]) {
        gobalState["loop"] = {};
        gobalState["loop"][nodeData.id] = {
            noOfTimes: nodeData.data.noOfTimes,
            currentTimes: 0
        }
    }
    if (gobalState.loop[nodeData.id].currentTimes < gobalState.loop[nodeData.id].noOfTimes) {
        gobalState.loop[nodeData.id].currentTimes += 1;
        console.log("yo", gobalState.loop[nodeData.id].currentTimes)
        return {
            gobalState,
            nodeData,
            nextConditon: "loop"
        }
    }
    else{
        return {
            gobalState,
            nodeData,
            nextConditon: "afterLoop"
        }
    }


    
}

export default loop;