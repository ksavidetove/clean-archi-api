import { IsDefined, IsNumber } from 'class-validator';

export class AttachSubTeamToTeamDto {
  @IsNumber()
  @IsDefined()
  parentTeamId: number;

  @IsNumber()
  @IsDefined()
  subTeamId: number;
}
