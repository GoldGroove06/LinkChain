
function setData(gobalState, nodeData) {
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