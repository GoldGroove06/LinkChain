function delay(gobalState, nodeData, automationObject) {
   let nextConditon;
    const delayTime = nodeData.data.delayTime;

    setInterval(() => {
        return {
       gobalState,
       nodeData,
       nextConditon
   }
    }
    , delayTime);
}

export default delay;