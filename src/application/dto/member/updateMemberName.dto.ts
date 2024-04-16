import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMemberNameDto {
  @IsNumber()
  @IsDefined()
  id: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
