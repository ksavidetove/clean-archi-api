import { Inject } from '@nestjs/common';
import { DetachTeamFromParentDto, TeamDto } from 'application/dto';
import { ITeamRepository } from 'domain/repositories';
import { TeamNotFoundError } from 'shared/expetions';
import { SYMBOLS } from 'shared/symbols';

export class DetachTeamFromParentUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(
    detachTeamFromParentDto: DetachTeamFromParentDto,
  ): Promise<TeamDto> {
    const subTeam = await this.teamRepository.findById(
      detachTeamFromParentDto.subTeamId,
    );

    if (!subTeam) {
      throw new TeamNotFoundError([detachTeamFromParentDto.subTeamId]);
    }

    subTeam.parentTeam = null;

    const updatedTeam = await this.teamRepository.update(subTeam.id, subTeam);
    return TeamDto.fromEntity(updatedTeam);
  }
}
