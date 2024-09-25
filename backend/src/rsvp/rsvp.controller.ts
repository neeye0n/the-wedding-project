import { Controller, Get, Param, Post } from '@nestjs/common';
import { RsvpService } from './rsvp.service';

@Controller(':id')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Get()
  getOne(@Param('id') id: string) {
    return this.rsvpService.getOne(id);
  }

  @Post('rsvp')
  update(@Param('id') id: string) {
    return this.rsvpService.rsvpTrigger(id);
  }
}
