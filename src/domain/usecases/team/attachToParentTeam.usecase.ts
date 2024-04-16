import { Inject, Injectable } from '@nestjs/common';
import { AttachSubTeamToTeamDto } from 'application/dto';
import { ITeamRepository } from 'domain/repositories';
import { TeamNotFoundError } from 'shared/expetions';
import { SYMBOLS } from 'shared/symbols';

@Injectable()
export class AttachToParentTeamUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(attachSubTeamToTeamDto: AttachSubTeamToTeamDto): Promise<void> {
    const subTeam = await this.teamRepository.findById(
      attachSubTeamToTeamDto.subTeamId,
    );
    const parentTeam = await this.teamRepository.findById(
      attachSubTeamToTeamDto.parentTeamId,
    );

    if (!subTeam) {
      throw new TeamNotFoundError([attachSubTeamToTeamDto.subTeamId]);
    }

    if (!parentTeam) {
      throw new TeamNotFoundError([attachSubTeamToTeamDto.parentTeamId]);
    }

    subTeam.parentTeam = parentTeam;

    await this.teamRepository.update(subTeam.id, subTeam);
  }
}
