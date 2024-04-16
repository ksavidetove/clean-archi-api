import { Module } from '@nestjs/common';
import { DomainModule } from 'domain/domain.module';
import TeamController from './controllers/team.controller';
import MemberController from './controllers/member.controller';

@Module({
  imports: [DomainModule],
  controllers: [TeamController, MemberController],
})
export class ApplicationModule {}
