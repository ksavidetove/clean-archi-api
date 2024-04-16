import { Test } from '@nestjs/testing';
import { AddMembersUseCase } from './addMembers.usecase';
import { ITeamRepository, IMemberRepository } from 'domain/repositories';
import { UpdateTeamMembersDto } from 'application/dto';
import { Member, Team } from 'domain/entities';
import { SYMBOLS } from 'shared/symbols';

describe('AddMembersUseCase', () => {
  let addMembersUseCase: AddMembersUseCase;
  const teamRepository: jest.Mocked<ITeamRepository> = {
    findById: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<ITeamRepository>;
  const memberRepository: jest.Mocked<IMemberRepository> = {
    findByIds: jest.fn(),
  } as unknown as jest.Mocked<IMemberRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AddMembersUseCase,
        {
          provide: SYMBOLS.TeamRepository,
          useValue: teamRepository,
        },
        {
          provide: SYMBOLS.MemberRepository,
          useValue: memberRepository,
        },
      ],
    }).compile();

    addMembersUseCase = moduleRef.get<AddMembersUseCase>(AddMembersUseCase);
  });

  describe('execute', () => {
    it('should add members to the team and return the updated team', async () => {
      // Arrange
      const teamId = 123;
      const ids = [1, 2];
      const addMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids,
      };

      const team = new Team();
      team.id = teamId;
      team.name = 'Team 1';
      team.members = [];
      team.parentTeam = null;
      team.subTeams = [];

      const members: Member[] = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(team);
      jest.spyOn(memberRepository, 'findByIds').mockResolvedValueOnce(members);
      jest.spyOn(teamRepository, 'update').mockResolvedValueOnce(team);

      // Act
      const result = await addMembersUseCase.execute(addMembersDto);

      // Assert
      expect(teamRepository.findById).toHaveBeenCalledWith(teamId);
      expect(memberRepository.findByIds).toHaveBeenCalledWith(ids);
      expect(teamRepository.update).toHaveBeenCalledWith(teamId, team);
      expect(result).toEqual(team);
    });

    it('should throw an error if the team is not found', async () => {
      // Arrange
      const teamId = 1;
      const ids = [1, 2];
      const addMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids,
      };

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(addMembersUseCase.execute(addMembersDto)).rejects.toThrow(
        'Team(s) [ 1 ] not found',
      );
    });

    it('should throw an error if any member is not found', async () => {
      // Arrange
      const teamId = 1;
      const ids = [1, 2];
      const addMembersDto: UpdateTeamMembersDto = {
        teamId,
        ids,
      };

      const team = new Team();
      team.id = teamId;
      team.members = [];

      const members: Member[] = [{ id: 1, name: 'John Doe' }];

      jest.spyOn(teamRepository, 'findById').mockResolvedValueOnce(team);
      jest.spyOn(memberRepository, 'findByIds').mockResolvedValueOnce(members);

      // Act & Assert
      await expect(addMembersUseCase.execute(addMembersDto)).rejects.toThrow(
        'Member(s) [ 2 ] not found',
      );
    });
  });
});
