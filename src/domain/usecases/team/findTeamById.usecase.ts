import { Inject } from '@nestjs/common';
import { FindTeamByIdDto, TeamDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { ITeamRepository } from 'domain/repositories';
import { TeamNotFoundError } from 'shared/expetions';

export class FindTeamByIdUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(findTeamDto: FindTeamByIdDto): Promise<TeamDto> {
    const team = await this.teamRepository.findById(findTeamDto.id, {
      relations: ['members', 'parentTeam', 'subTeams'],
    });

    if (!team) {
      throw new TeamNotFoundError([findTeamDto.id]);
    }

    return TeamDto.fromEntity(team);
  }
}
