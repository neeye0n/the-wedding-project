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

  @Put(':inviteId/rsvp')
  async updateRSVP(@Param('inviteId') id: string) {
    const result = await this.inviteService.updateRsvp(id);
    if (result === false || result === undefined) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':inviteId')
  async getByInviteId(@Param('inviteId') id: string) {
    const result = await this.inviteService.getByInviteId(id);
    if (result === undefined || result === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get()
  async listIinvites() {
    const result = await this.inviteService.listInvites();
    if (result === undefined || result === null || result.length === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
