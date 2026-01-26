
async function setData(gobalState, nodeData) {
    let nextConditon = "b";
    console.log(nodeData)
    const dataStore = nodeData.data.dataStore;
    console.log(dataStore)
    for (const [key, value] of Object.entries(dataStore)) {
        gobalState[value.name] = {
            value: value.value,
            type: value.type
        };
}

    return {
        gobalState,
        nodeData,
        nextConditon
    }
    
}

export default setData;