import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { InvitesService } from 'src/services/invite/invite.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly inviteService: InvitesService) {}

  // Update RSVP for a specific invite by ID
  @Put(':inviteId/rsvp')
  async updateRSVP(@Param('inviteId') id: string) {
    const updateSuccess = await this.inviteService.updateRsvp(id);

    if (!updateSuccess) {
      throw new HttpException('Unable to update RSVP.', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'RSVP updated successfully',
      inviteId: id,
    };
  }

  // Get a specific invite by ID
  @Get(':inviteId')
  async getInviteById(@Param('inviteId') id: string) {
    const invite = await this.inviteService.getInviteById(id);
    return invite;
  }

  // List all invites
  @Get()
  async listInvites() {
    const invites = await this.inviteService.listInvites();

    if (!invites || invites.length === 0) {
      throw new HttpException('No invites found.', HttpStatus.NOT_FOUND);
    }

    return invites;
  }
}
