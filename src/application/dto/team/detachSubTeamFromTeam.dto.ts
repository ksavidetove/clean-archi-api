import { IsDefined, IsNumber } from 'class-validator';

export class DetachTeamFromParentDto {
  @IsNumber()
  @IsDefined()
  subTeamId: number;
}
