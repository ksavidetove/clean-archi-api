import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
