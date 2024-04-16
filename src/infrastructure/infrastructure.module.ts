import { Module } from '@nestjs/common';
import { MemberRepository } from './repositoriesImpl/member.repository';
import { TeamRepository } from './repositoriesImpl/team.repository';
import { SYMBOLS } from 'shared/symbols';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Team } from '../domain/entities';

const teamRepositoryProvider = {
  provide: SYMBOLS.TeamRepository,
  useClass: TeamRepository,
};

const memberRepositoryProvider = {
  provide: SYMBOLS.MemberRepository,
  useClass: MemberRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member])],
  providers: [teamRepositoryProvider, memberRepositoryProvider],
  exports: [teamRepositoryProvider, memberRepositoryProvider],
})
export class InfrastructureModule {}
