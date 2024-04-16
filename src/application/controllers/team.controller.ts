import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BodyAndParam } from 'application/decorators/BodyAndParam.decorator';
import {
  AttachSubTeamToTeamDto,
  CreateTeamDto,
  DeleteTeamDto,
  DetachTeamFromParentDto,
  FindTeamByIdDto,
  FindTeamDto,
  TeamDto,
  UpdateTeamMembersDto,
  UpdateTeamNameDto,
} from 'application/dto';
import {
  AddMembersUseCase,
  AttachToParentTeamUseCase,
  CreateTeamUseCase,
  DeleteMemberUseCase,
  DetachTeamFromParentUseCase,
  FindTeamByIdUseCase,
  FindTeamUseCase,
  RemoveMembersUseCase,
  UpdateTeamNameUseCase,
} from 'domain/usecases';

@Controller('team')
export default class TeamController {
  constructor(
    private readonly createTeamUseCase: CreateTeamUseCase,
    private readonly findTeamUseCase: FindTeamUseCase,
    private readonly findTeamByIdUseCase: FindTeamByIdUseCase,
    private readonly attachToParentTeamUseCase: AttachToParentTeamUseCase,
    private readonly detachFromParentTeamUseCase: DetachTeamFromParentUseCase,
    private readonly updateTeamNameUseCase: UpdateTeamNameUseCase,
    private readonly addMembersUseCase: AddMembersUseCase,
    private readonly removeMembersUseCase: RemoveMembersUseCase,
    private readonly deleteMembersUseCase: DeleteMemberUseCase,
  ) {}

  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    return this.createTeamUseCase.execute(createTeamDto);
  }

  @Put(':id')
  async updateTeamName(
    @BodyAndParam() updateTeamNameDto: UpdateTeamNameDto,
  ): Promise<TeamDto> {
    return this.updateTeamNameUseCase.execute(updateTeamNameDto);
  }

  @Get()
  find(@Query() findTeamDto: FindTeamDto): Promise<TeamDto[]> {
    return this.findTeamUseCase.execute(findTeamDto);
  }

  @Delete(':id')
  removeMember(@Param() deleteTeamDto: DeleteTeamDto): Promise<boolean> {
    return this.deleteMembersUseCase.execute(deleteTeamDto);
  }

  @Get(':id')
  findById(@Param() findTeamByIdDto: FindTeamByIdDto): Promise<TeamDto> {
    return this.findTeamByIdUseCase.execute(findTeamByIdDto);
  }

  @Post(':teamId/addMembers')
  addMembers(
    @BodyAndParam() addMembersDto: UpdateTeamMembersDto,
  ): Promise<TeamDto> {
    return this.addMembersUseCase.execute(addMembersDto);
  }

  @Post(':teamId/removeMembers')
  removeMembers(
    @BodyAndParam() removeMembersDto: UpdateTeamMembersDto,
  ): Promise<TeamDto> {
    return this.removeMembersUseCase.execute(removeMembersDto);
  }

  @Get(':subTeamId/linkTo/:parentTeamId')
  attachToParentTeam(
    @Param() attachToParentTeamDto: AttachSubTeamToTeamDto,
  ): Promise<void> {
    return this.attachToParentTeamUseCase.execute(attachToParentTeamDto);
  }

  @Get(':subTeamId/unlink')
  detachFromParentTeam(
    @Param() detachFromParentTeamDto: DetachTeamFromParentDto,
  ): Promise<TeamDto> {
    return this.detachFromParentTeamUseCase.execute(detachFromParentTeamDto);
  }
}
