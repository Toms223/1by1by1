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
    }).json()
    return response.id
}

async function checkInstance(id){
    let response = await fetch(`${APIUrl}/${id}`, {
        method: "GET",
        headers: headers
    }).json()
    return new Promise(async resolve => {
        while(response.stopped !== true){
            response = await fetch(`${APIUrl}/${id}`, {
                method: "GET",
                headers: headers
            }).json()
        }
        resolve(response)
    })
}

async function closeInstance(username, score){
    if((await getDocumentByProperty("Scores",{name: "username", value: `${username}`})).length !== 0){
        await editScore(username, score)
    }
    else{
        await addScore(username,score)
    }
}