import { Inject } from '@nestjs/common';
import { FindTeamDto, TeamDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { ITeamRepository } from 'domain/repositories';

export class FindTeamUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(findTeamDto: FindTeamDto): Promise<TeamDto[]> {
    const teams = await this.teamRepository.find(findTeamDto);
    return teams.map(TeamDto.fromEntity);
  }
}
