import { IsDefined, IsNumber } from 'class-validator';

export class DeleteMemberDto {
  @IsNumber()
  @IsDefined()
  id: number;
}
