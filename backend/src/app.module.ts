import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GsheetsService } from './services/gsheet/gsheet.service';
import { InvitesService } from './services/invite/invite.service';
import { InvitesController } from './controllers/invite/invite.controller';

@Module({
  imports: [],
  controllers: [AppController, InvitesController],
  providers: [AppService, GsheetsService, InvitesService],
})
export class AppModule {}
