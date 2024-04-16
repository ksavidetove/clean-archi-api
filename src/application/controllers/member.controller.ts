import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BodyAndParam } from 'application/decorators/BodyAndParam.decorator';
import {
  CreateMemberDto,
  DeleteMemberDto,
  FindMemberByIdDto,
  MemberDto,
  UpdateMemberNameDto,
} from 'application/dto';
import {
  CreateMemberUseCase,
  FindMemberByIdUseCase,
  DeleteMemberUseCase,
  UpdateMemberNameUseCase,
} from 'domain/usecases';

@Controller('member')
export default class MemberController {
  constructor(
    private readonly createMemberUseCase: CreateMemberUseCase,
    private readonly findMemberByIdUseCase: FindMemberByIdUseCase,
    private readonly deleteMembersUseCase: DeleteMemberUseCase,
    private readonly updateMemberNameUseCase: UpdateMemberNameUseCase,
  ) {}

  @Post()
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<MemberDto> {
    return this.createMemberUseCase.execute(createMemberDto);
  }

  @Get(':id')
  findById(@Param() findMemberByIdDto: FindMemberByIdDto): Promise<MemberDto> {
    return this.findMemberByIdUseCase.execute(findMemberByIdDto);
  }

  @Delete(':id')
  removeMember(@Param() deleteMemberDto: DeleteMemberDto): Promise<boolean> {
    return this.deleteMembersUseCase.execute(deleteMemberDto);
  }

  @Put(':id')
  async updateMemberName(
    @BodyAndParam() updateMemberNameDto: UpdateMemberNameDto,
  ): Promise<MemberDto> {
    return this.updateMemberNameUseCase.execute(updateMemberNameDto);
  }
}
