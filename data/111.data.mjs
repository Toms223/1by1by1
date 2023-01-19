import {createDocument, editField, getDocumentByProperty, getDocuments} from "./elasticSearch-client.mjs";

export async function getScores(){
    let scores = await getDocuments("Scores")
    return processScores(scores)
}

function processScores(scores){
    let scoreArray = []
    for(let score in scores){
        let parsedScore = {}
        parsedScore.score = scores[score].score
        parsedScore.username = scores[score].username
        scoreArray.push(parsedScore)
    }
    return scoreArray
}

export async function addScore(username, score){
    let scoreObject = {
        username: username,
        score: score
    }
    await createDocument("Scores",scoreObject)
}

export async function editScore(username, score){
    let scoreObject = {
        username: username,
        score: score
    }
    let id = (await getDocumentByProperty("Scores",{name: "username", value: `${username}`}))[0].id
    await editField("Scores",id,"score",score)

}