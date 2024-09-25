import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RsvpService } from './rsvp/rsvp.service';
import { GsheetsService } from './gsheets/gsheets.service';
import { RsvpController } from './rsvp/rsvp.controller';
import { RsvpsController } from './rsvp/rsvps.controller';

@Module({
  imports: [],
  controllers: [AppController, RsvpController, RsvpsController],
  providers: [AppService, RsvpService, GsheetsService],
})
export class AppModule {}
