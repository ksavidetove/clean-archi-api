import { Inject, Injectable } from '@nestjs/common';
import { TeamDto, UpdateTeamMembersDto } from 'application/dto';
import { IMemberRepository, ITeamRepository } from 'domain/repositories';
import { MemberNotFoundError, TeamNotFoundError } from 'shared/expetions';
import { SYMBOLS } from 'shared/symbols';

@Injectable()
export class AddMembersUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(SYMBOLS.MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(addMembersDto: UpdateTeamMembersDto): Promise<TeamDto> {
    const team = await this.teamRepository.findById(addMembersDto.teamId);
    if (!team) {
      throw new TeamNotFoundError([addMembersDto.teamId]);
    }

    const members = await this.memberRepository.findByIds(addMembersDto.ids);
    if (members.length !== addMembersDto.ids.length) {
      const missingIds = addMembersDto.ids.filter(
        (id) => !members.map((m) => m.id).includes(id),
      );
      throw new MemberNotFoundError(missingIds);
    }

    team.members = team.members ? [...team.members, ...members] : members;

    const updatedTeam = await this.teamRepository.update(team.id, team);
    return TeamDto.fromEntity(updatedTeam);
  }
}
