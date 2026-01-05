
function setData(gobalState, nodeData, automationObject) {
    let nextConditon;
    nodeData.data.dataStore.forEach((data) => {
        gobalState[data.variable] = data.variableValue
    })

    return {
        gobalState,
        nodeData,
        nextConditon
    }
    
}

export default setData;