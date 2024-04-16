import { Inject } from '@nestjs/common';
import { CreateTeamDto, TeamDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { ITeamRepository } from 'domain/repositories';

export class CreateTeamUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(createTeamDto: CreateTeamDto): Promise<TeamDto> {
    const team = await this.teamRepository.create(createTeamDto.name);
    return TeamDto.fromEntity(team);
  }
}
