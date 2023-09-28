
import websocketPlugin from '@fastify/websocket';

import fastify from 'fastify';


export const createServer = async () => {
  const server = fastify();


  server.register(websocketPlugin, {
    options: { perMessageDeflate: true, maxPayload: 100 * 1024 * 1024, clientTracking: true },
  });


  server.register(async function(ws) {
    ws.get("/websocket", {websocket: true}, (connection, req) => {
      connection.socket.on('error', error => console.error(error));
      connection.socket.on('close', e => console.log(e));
      connection.on('close', e => console.log(e));
      connection.socket.on("message", message => { 
        console.log(message.toString())
    connection.socket.send("Response from Server");
      })
    })
  })
  

  server.all('*', (request, reply) => {
    reply.status(404).send({ error: 'Route does not exist' });
  });


  return server;
};
