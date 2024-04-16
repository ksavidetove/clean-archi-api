import { IsDefined, IsArray, IsNumber } from 'class-validator';

export class UpdateTeamMembersDto {
  @IsArray()
  @IsDefined()
  ids: number[];

  @IsDefined()
  @IsNumber()
  teamId: number;
}
