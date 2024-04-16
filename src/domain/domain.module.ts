import { Module } from '@nestjs/common';
import {
  AddMembersUseCase,
  AttachToParentTeamUseCase,
  CreateTeamUseCase,
  DeleteTeamUseCase,
  DetachTeamFromParentUseCase,
  FindTeamByIdUseCase,
  FindTeamUseCase,
  RemoveMembersUseCase,
  UpdateTeamNameUseCase,
  CreateMemberUseCase,
  DeleteMemberUseCase,
  FindMemberByIdUseCase,
  UpdateMemberNameUseCase,
} from './usecases';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    AddMembersUseCase,
    RemoveMembersUseCase,
    AttachToParentTeamUseCase,
    DetachTeamFromParentUseCase,
    CreateTeamUseCase,
    DeleteTeamUseCase,
    UpdateTeamNameUseCase,
    FindTeamByIdUseCase,
    FindTeamUseCase,
    CreateMemberUseCase,
    DeleteMemberUseCase,
    FindMemberByIdUseCase,
    UpdateMemberNameUseCase,
  ],
  exports: [
    AddMembersUseCase,
    RemoveMembersUseCase,
    AttachToParentTeamUseCase,
    DetachTeamFromParentUseCase,
    CreateTeamUseCase,
    DeleteTeamUseCase,
    UpdateTeamNameUseCase,
    FindTeamByIdUseCase,
    FindTeamUseCase,
    CreateMemberUseCase,
    DeleteMemberUseCase,
    FindMemberByIdUseCase,
    UpdateMemberNameUseCase,
  ],
})
export class DomainModule {}
