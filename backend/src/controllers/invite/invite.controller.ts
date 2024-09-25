import { Controller, Get, Param, Post } from '@nestjs/common';
import { InvitesService } from 'src/services/invite/invite.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly inviteService: InvitesService) {}

  @Post(':inviteId/rsvp')
  updateRSVP(@Param('inviteId') id: string) {
    return this.inviteService.updateRsvp(id);
  }

  @Get(':inviteId')
  async getByInviteId(@Param('inviteId') id: string) {
    const result = await this.inviteService.getByInviteId(id);
    return result;
  }

  @Get()
  async listIinvites() {
    const result = await this.inviteService.listInvites();
    return result;
  }
}
