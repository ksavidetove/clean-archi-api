import { Test } from '@nestjs/testing';
import { FindMemberByIdUseCase } from './findMemberById.usecase';
import { IMemberRepository } from 'domain/repositories';
import { SYMBOLS } from 'shared/symbols';
import { Member } from 'domain/entities';

describe('FindMemberByIdUseCase', () => {
  let findMemberByIdUseCase: FindMemberByIdUseCase;
  const memberRepository: jest.Mocked<IMemberRepository> = {
    findOneById: jest.fn(),
  } as unknown as jest.Mocked<IMemberRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindMemberByIdUseCase,
        {
          provide: SYMBOLS.MemberRepository,
          useValue: memberRepository,
        },
      ],
    }).compile();

    findMemberByIdUseCase = moduleRef.get<FindMemberByIdUseCase>(
      FindMemberByIdUseCase,
    );
  });

  describe('execute', () => {
    it('should return a member when found', async () => {
      // Arrange
      const findMemberDto = { id: 1 };
      const member: Member = {
        id: 1,
        name: 'John Doe',
      };
      memberRepository.findOneById.mockResolvedValue(member);

      // Act
      const result = await findMemberByIdUseCase.execute(findMemberDto);

      // Assert
      expect(result).toEqual(member);
      expect(memberRepository.findOneById).toHaveBeenCalledWith(
        findMemberDto.id,
      );
    });

    it('should throw an error when member is not found', async () => {
      // Arrange
      const findMemberDto = { id: 1 };
      memberRepository.findOneById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        findMemberByIdUseCase.execute(findMemberDto),
      ).rejects.toThrow('Member(s) [ 1 ] not found');
      expect(memberRepository.findOneById).toHaveBeenCalledWith(
        findMemberDto.id,
      );
    });
  });
});
