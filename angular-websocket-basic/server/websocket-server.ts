import * as express from "express";
import * as path from "path";
import {Server} from "ws"; 
//You’ll use Server from the ws module to instantiate a WebSocket server
//angular application server + angular websocket server
const app = express();

// HTTP Server
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../websocket-client.html')));
//When the HTTP client connects with the root path, the HTTP server will send back this HTML file.

const httpServer = app.listen(8000, "localhost", () => {
    console.log(`HTTP server is listening on localhost:8000`);
});
//Starts the HTTP server on port 8000

// WebSocket Server, Starts the WebSocket server on port 8085
const wsServer = new Server({port:8085}); //3000
console.log('WebSocket server is listening on localhost:8085');

//Listens to connection event from clients

wsServer.on('connection',
           wsClient => {
               wsClient.send('This message was pushed by the WebSocket server'); 
               //Pushes the message to the newly connected client

               wsClient.onerror = (error) =>
                   console.log(`The server received: ${error['code']}`);  //Handles connection errors
           }
);





// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
