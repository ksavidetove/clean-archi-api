import { IsDefined, IsNumber } from 'class-validator';

export class FindMemberByIdDto {
  @IsNumber()
  @IsDefined()
  id: number;
}
