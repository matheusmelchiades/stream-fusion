import fs from 'node:fs'
import http from 'node:http'
import https from 'node:https'
import storage from './storage.js'

const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/stream-fusion.appspot.com/o/video.mp4?alt=media&token=9201e486-be1c-4176-aca5-233cc32cd0bc'

http.createServer(async (request, response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    }

    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers)
        response.end()
        return
    }

    await storage.getFiles()

    https.get(storageUrl, (res) => {
        res.pipe(response)
    })
})
    .listen(3000, () => console.log('server is running 3000'))