import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
