import { json } from "@types/body-parser";
import { body } from "express-validator/lib";

async function httpRequest(globalState, nodeData) {
    let nextConditon = "b";
    console.log("headers", nodeData.data.header)
    console.log("body", nodeData.data.body)
    console.log("query", nodeData.data.queryParams)
    let formattedHeaders = {}
    let formattedQueryParams = {}

    nodeData.data.headers.forEach((element: { name: string, value: string }) => {
        formattedHeaders = {
            ...formattedHeaders,
            [element.name]: element.value
        }
    })

    nodeData.data.queryParams.forEach((element: { name: string, value: string }) => {
        formattedQueryParams = {
            ...formattedQueryParams,
            [element.name]: element.value
        }
    })

    const url = new URL(nodeData.data.url)

    url.search = new URLSearchParams(formattedQueryParams).toString()

    const options = {
        method: nodeData.data.method,
        headers: formattedHeaders
    }

    if (nodeData.data.method != 'GET') {
        options.body = JSON.stringify(nodeData.data.body)
    }
    // console.log(url)
    fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
    return (
        {
            globalState,
            nodeData,
            nextConditon
        }
    )
}

export default httpRequest;