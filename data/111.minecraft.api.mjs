import fetch from "node-fetch"
import {addScore, editScore} from "./111.data.mjs";
import {getDocumentByProperty} from "./elasticSearch-client.mjs";
let headers = {
    "Content-Type": "application/json"
}
let APIUrl = "localhost:2094"
async function createInstance(username){
    let response = await fetch(APIUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({username: username})
    })
    return response.status
}

async function closeInstance(username, score){
    if((await getDocumentByProperty("Scores",{name: "username", value: `${username}`})).length !== 0){
        await editScore(username, score)
    }
    else{
        await addScore(username,score)
    }
}