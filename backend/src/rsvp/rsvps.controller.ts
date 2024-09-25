import { Controller, Get } from '@nestjs/common';
import { RsvpService } from 'src/rsvp/rsvp.service';

@Controller('rsvps')
export class RsvpsController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Get()
  getOne() {
    return this.rsvpService.getAll();
  }
}
