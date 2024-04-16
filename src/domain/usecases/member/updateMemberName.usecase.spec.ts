import { Test } from '@nestjs/testing';
import { UpdateMemberNameUseCase } from './updateMemberName.usecase';
import { IMemberRepository } from 'domain/repositories';
import { MemberDto, UpdateMemberNameDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';

describe('UpdateMemberNameUseCase', () => {
  let updateMemberNameUseCase: UpdateMemberNameUseCase;
  const memberRepository: jest.Mocked<IMemberRepository> = {
    exists: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<IMemberRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateMemberNameUseCase,
        {
          provide: SYMBOLS.MemberRepository,
          useValue: memberRepository,
        },
      ],
    }).compile();

    updateMemberNameUseCase = moduleRef.get<UpdateMemberNameUseCase>(
      UpdateMemberNameUseCase,
    );
  });

  describe('execute', () => {
    it('should throw an error if member does not exist', async () => {
      const updateMemberDto: UpdateMemberNameDto = {
        id: 1,
        name: 'John Doe',
      };

      memberRepository.exists = jest.fn().mockResolvedValue(false);

      await expect(
        updateMemberNameUseCase.execute(updateMemberDto),
      ).rejects.toThrow('Member(s) [ 1 ] not found');
    });

    it('should update the member name and return the updated member', async () => {
      const updateMemberDto: UpdateMemberNameDto = {
        id: 1,
        name: 'John Doe',
      };
      const updatedMember = {
        id: 1,
        name: 'John Doe',
      };

      memberRepository.exists = jest.fn().mockResolvedValue(true);
      memberRepository.update = jest.fn().mockResolvedValue(updatedMember);

      const result = await updateMemberNameUseCase.execute(updateMemberDto);

      expect(memberRepository.update).toHaveBeenCalledWith(1, {
        name: 'John Doe',
      });
      expect(result).toEqual(MemberDto.fromEntity(updatedMember));
    });
  });
});
