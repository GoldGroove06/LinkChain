function ifCondition(gobalState, nodeData, automationObject) {
    let nextConditon;

    if (nodeData.data.compareType === "and") {
        const condition = nodeData.data.dataStore.every((data) => data.value1 === data.value2);
        console.log("condition in if AND", condition);
        nextConditon = condition ? "true" : "false";
    }
    else if (nodeData.data.compareType === "or") {
        const condition = nodeData.data.dataStore.some((data) => data.value1 === data.value2);
         console.log("condition in if OR", condition);
        nextConditon = condition ? "true" : "false";
    }


    return {
        gobalState,
        nodeData,
        nextConditon
    }

}

export default ifCondition;