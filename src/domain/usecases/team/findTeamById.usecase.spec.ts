import { Test } from '@nestjs/testing';
import { FindTeamByIdUseCase } from './findTeamById.usecase';
import { ITeamRepository } from 'domain/repositories';
import { SYMBOLS } from 'shared/symbols';

describe('FindTeamByIdUseCase', () => {
  let findTeamByIdUseCase: FindTeamByIdUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    findById: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindTeamByIdUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: teamRepository,
        },
      ],
    }).compile();

    findTeamByIdUseCase =
      moduleRef.get<FindTeamByIdUseCase>(FindTeamByIdUseCase);
  });

  describe('execute', () => {
    it('should throw an error if team is not found', async () => {
      // Arrange
      const findTeamDto = { id: 1 };

      teamRepository.findById.mockResolvedValue(null);

      // Act
      const executePromise = findTeamByIdUseCase.execute(findTeamDto);

      // Assert
      await expect(executePromise).rejects.toThrow('Team(s) [ 1 ] not found');
    });
  });
});
