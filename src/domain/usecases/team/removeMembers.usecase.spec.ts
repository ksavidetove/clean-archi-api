import { Test } from '@nestjs/testing';
import { RemoveMembersUseCase } from './removeMembers.usecase';
import { ITeamRepository } from 'domain/repositories';
import { UpdateTeamMembersDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { Team } from 'domain/entities';

describe('RemoveMembersUseCase', () => {
  let removeMembersUseCase: RemoveMembersUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    findById: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RemoveMembersUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: teamRepository,
        },
      ],
    }).compile();

    removeMembersUseCase =
      moduleRef.get<RemoveMembersUseCase>(RemoveMembersUseCase);
  });

  describe('execute', () => {
    it('should remove members from the team and return the updated team', async () => {
      // Arrange
      const teamId = 1;
      const memberIdsToRemove = [1, 2];
      const removeMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids: memberIdsToRemove,
      };

      const existingTeam: Team = {
        id: teamId,
        name: 'Team 1',
        members: [
          { id: 1, name: 'Member 1' },
          { id: 2, name: 'Member 2' },
          { id: 3, name: 'Member 3' },
        ],
        parentTeam: null,
        subTeams: [],
      };

      const updatedTeam: Team = {
        id: teamId,
        name: 'Team 1',
        members: [{ id: 3, name: 'Member 3' }],
        parentTeam: null,
        subTeams: [],
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValue(existingTeam);
      jest.spyOn(teamRepository, 'update').mockResolvedValue(updatedTeam);

      // Act
      const result = await removeMembersUseCase.execute(removeMembersDto);

      // Assert
      expect(teamRepository.findById).toHaveBeenCalledWith(teamId);
      expect(teamRepository.update).toHaveBeenCalledWith(teamId, updatedTeam);
      expect(result).toEqual(updatedTeam);
    });

    it('should throw an error if the team is not found', async () => {
      // Arrange
      const teamId = 1;
      const memberIdsToRemove = [1, 2];
      const removeMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids: memberIdsToRemove,
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValue(null);

      // Act & Assert
      await expect(
        removeMembersUseCase.execute(removeMembersDto),
      ).rejects.toThrow('Team(s) [ 1 ] not found');
    });

    it('should return an empty array of members if the team has no members', async () => {
      // Arrange
      const teamId = 1;
      const memberIdsToRemove = [1, 2];
      const removeMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids: memberIdsToRemove,
      };

      const existingTeam: Team = {
        id: teamId,
        name: 'Team 1',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      const updatedTeam: Team = {
        id: teamId,
        name: 'Team 1',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValue(existingTeam);
      jest.spyOn(teamRepository, 'update').mockResolvedValue(updatedTeam);

      // Act
      const result = await removeMembersUseCase.execute(removeMembersDto);

      // Assert
      expect(teamRepository.findById).toHaveBeenCalledWith(teamId);
      expect(teamRepository.update).toHaveBeenCalledWith(teamId, updatedTeam);
      expect(result).toEqual(updatedTeam);
    });
  });
});
