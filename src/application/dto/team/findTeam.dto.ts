import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTeamDto {
  @IsArray()
  @IsString({each: true})
  @IsOptional()
  name?: string;

  @IsArray()
  @IsNumber({}, {each: true})
  @IsOptional()
  id?: number;
}
