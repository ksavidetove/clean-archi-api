import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNumber } from 'class-validator';
import { TeamDto } from './team.dto';
import { Team } from 'domain/entities';
import { plainToInstance } from 'class-transformer';

export class UpdateTeamDto extends PartialType(TeamDto) {
  @IsNumber()
  @IsDefined()
  id: number;

  static toEntity(updateTeamDto: UpdateTeamDto): Team {
    return plainToInstance(Team, updateTeamDto);
  }
}
