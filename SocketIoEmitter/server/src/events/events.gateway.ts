/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import {OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
@Injectable()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  sendData(message: string) {
    console.log("Gateway message", message);
    this.server.emit('EmitData', message);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(`client ${client.handshake.headers.origin} is connecting on websocket`);
  }
}
