import { IsDefined, IsNumber } from 'class-validator';

export class FindTeamByIdDto {
  @IsNumber()
  @IsDefined()
  id: number;
}
