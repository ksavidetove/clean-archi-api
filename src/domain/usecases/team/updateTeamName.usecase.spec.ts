import { Test } from '@nestjs/testing';
import { UpdateTeamNameUseCase } from './updateTeamName.usecase';
import { ITeamRepository } from 'domain/repositories';
import { TeamDto, UpdateTeamNameDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { Team } from 'domain/entities';

describe('UpdateTeamNameUseCase', () => {
  let updateTeamNameUseCase: UpdateTeamNameUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    exists: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateTeamNameUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: teamRepository,
        },
      ],
    }).compile();

    updateTeamNameUseCase = moduleRef.get<UpdateTeamNameUseCase>(
      UpdateTeamNameUseCase,
    );
  });

  describe('execute', () => {
    it('should update team name and return the updated team', async () => {
      // Arrange
      const updateTeamDto: UpdateTeamNameDto = {
        id: 1,
        name: 'New Team Name',
      };
      const updatedTeam: Team = {
        id: 1,
        name: 'New Team Name',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      jest.spyOn(teamRepository, 'exists').mockResolvedValue(true);
      jest.spyOn(teamRepository, 'update').mockResolvedValue(updatedTeam);

      // Act
      const result = await updateTeamNameUseCase.execute(updateTeamDto);

      // Assert
      expect(teamRepository.exists).toHaveBeenCalledWith(updateTeamDto.id);
      expect(teamRepository.update).toHaveBeenCalledWith(updateTeamDto.id, {
        name: updateTeamDto.name,
      });
      expect(result).toEqual(TeamDto.fromEntity(updatedTeam));
    });

    it('should throw an error if team does not exist', async () => {
      // Arrange
      const updateTeamDto: UpdateTeamNameDto = {
        id: 1,
        name: 'New Team Name',
      };

      jest.spyOn(teamRepository, 'exists').mockResolvedValue(false);

      // Act & Assert
      await expect(
        updateTeamNameUseCase.execute(updateTeamDto),
      ).rejects.toThrow('Team(s) [ 1 ] not found');
    });
  });
});
