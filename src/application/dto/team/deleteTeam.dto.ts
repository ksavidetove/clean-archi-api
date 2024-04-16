import { IsDefined, IsNumber } from 'class-validator';

export class DeleteTeamDto {
  @IsNumber()
  @IsDefined()
  id: number;
}
