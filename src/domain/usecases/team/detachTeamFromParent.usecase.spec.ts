import { Test } from '@nestjs/testing';
import { DetachTeamFromParentDto } from 'application/dto';
import { ITeamRepository } from 'domain/repositories';
import { SYMBOLS } from 'shared/symbols';
import { DetachTeamFromParentUseCase } from './detachTeamFromParent.usecase';

describe('DetachTeamFromParentUseCase', () => {
  let useCase: DetachTeamFromParentUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    findById: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DetachTeamFromParentUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = moduleRef.get<DetachTeamFromParentUseCase>(
      DetachTeamFromParentUseCase,
    );
  });

  describe('execute', () => {
    it('should throw an error if the sub team is not found', async () => {
      // Arrange
      const detachTeamFromParentDto: DetachTeamFromParentDto = {
        subTeamId: 1,
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(detachTeamFromParentDto)).rejects.toThrow(
        'Team(s) [ 1 ] not found',
      );
    });
  });
});
