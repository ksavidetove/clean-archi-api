import { Inject } from '@nestjs/common';
import { TeamDto, UpdateTeamMembersDto } from 'application/dto';
import { ITeamRepository } from 'domain/repositories';
import { TeamNotFoundError } from 'shared/expetions';
import { SYMBOLS } from 'shared/symbols';

export class RemoveMembersUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(removeMembersDto: UpdateTeamMembersDto): Promise<TeamDto> {
    const team = await this.teamRepository.findById(removeMembersDto.teamId);
    if (!team) {
      throw new TeamNotFoundError([removeMembersDto.teamId]);
    }

    team.members = team.members
      ? team.members.filter((m) => !removeMembersDto.ids.includes(m.id))
      : [];

    const updatedTeam = await this.teamRepository.update(team.id, team);
    return TeamDto.fromEntity(updatedTeam);
  }
}
