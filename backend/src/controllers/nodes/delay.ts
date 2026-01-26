async function delay(gobalState, nodeData) {
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