import { Inject } from '@nestjs/common';
import { TeamDto, UpdateTeamNameDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { ITeamRepository } from 'domain/repositories';
import { TeamNotFoundError } from 'shared/expetions';

export class UpdateTeamNameUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(updateTeamDto: UpdateTeamNameDto): Promise<TeamDto> {
    const teamExists = await this.teamRepository.exists(updateTeamDto.id);

    if (!teamExists) {
      throw new TeamNotFoundError([updateTeamDto.id]);
    }

    const updatedTeam = await this.teamRepository.update(updateTeamDto.id, {
      name: updateTeamDto.name,
    });
    return TeamDto.fromEntity(updatedTeam);
  }
}
