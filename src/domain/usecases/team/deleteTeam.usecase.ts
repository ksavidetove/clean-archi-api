import { Inject } from '@nestjs/common';
import { DeleteTeamDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { ITeamRepository } from 'domain/repositories';

export class DeleteTeamUseCase {
  constructor(
    @Inject(SYMBOLS.TeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(deleteTeamDto: DeleteTeamDto): Promise<boolean> {
    return this.teamRepository.delete(deleteTeamDto.id);
  }
}
