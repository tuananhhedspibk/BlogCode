/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Post, Req } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';

@Controller('/app')
export class AppController {
  constructor(private readonly eventGateway: EventsGateway) {}

  @Post('/push-data')
  pushData(@Body() body: any, @Req() req): void {
    console.log(`Received message: ${body.message} from ${req.headers.origin} by http connection`);
    return this.eventGateway.sendData(body.message);
  }
}
