import { Test } from '@nestjs/testing';
import { AttachToParentTeamUseCase } from './attachToParentTeam.usecase';
import { ITeamRepository } from 'domain/repositories';
import { AttachSubTeamToTeamDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';

describe('AttachToParentTeamUseCase', () => {
  let attachToParentTeamUseCase: AttachToParentTeamUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    findById: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AttachToParentTeamUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: teamRepository,
        },
      ],
    }).compile();

    attachToParentTeamUseCase = moduleRef.get<AttachToParentTeamUseCase>(
      AttachToParentTeamUseCase,
    );
  });

  describe('execute', () => {
    it('should attach sub team to parent team', async () => {
      // Arrange
      const attachSubTeamToTeamDto: AttachSubTeamToTeamDto = {
        subTeamId: 1,
        parentTeamId: 2,
      };

      const subTeam = {
        id: 1,
        parentTeam: null,
        name: 'Team 1',
        members: [],
        subTeams: [],
      };
      const parentTeam = {
        id: 2,
        name: 'Team 2',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(subTeam);
      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(parentTeam);

      // Act
      await attachToParentTeamUseCase.execute(attachSubTeamToTeamDto);

      // Assert
      expect(teamRepository.findById).toHaveBeenCalledTimes(2);
      expect(subTeam.parentTeam).toBe(parentTeam);
      expect(teamRepository.update).toHaveBeenCalledWith(1, subTeam);
    });

    it('should throw an error if sub team is not found', async () => {
      // Arrange
      const attachSubTeamToTeamDto: AttachSubTeamToTeamDto = {
        subTeamId: 1,
        parentTeamId: 2,
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        attachToParentTeamUseCase.execute(attachSubTeamToTeamDto),
      ).rejects.toThrow('Team(s) [ 1 ] not found');
    });

    it('should throw an error if parent team is not found', async () => {
      // Arrange
      const attachSubTeamToTeamDto: AttachSubTeamToTeamDto = {
        subTeamId: 1,
        parentTeamId: 2,
      };

      const subTeam = {
        id: 1,
        parentTeam: null,
        name: 'Team 1',
        members: [],
        subTeams: [],
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(subTeam);
      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        attachToParentTeamUseCase.execute(attachSubTeamToTeamDto),
      ).rejects.toThrow('Team(s) [ 2 ] not found');
    });
  });
});
