import { TeamDto } from './team.dto';
import { Team } from 'domain/entities';

describe('TeamDto', () => {
  describe('fromEntity', () => {
    it('should convert a Team entity to a TeamDto object', () => {
      // Arrange
      const teamEntity: Team = {
        id: 1,
        name: 'Team A',
        members: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ],
        parentTeam: {
          id: 2,
          name: 'Parent Team',
          members: [
            { id: 3, name: 'John Doe' },
            { id: 4, name: 'Jane Smith' },
          ],
        },
        subTeams: [
          {
            id: 3,
            name: 'Sub Team 1',
            members: [
              { id: 5, name: 'John Doe' },
              { id: 6, name: 'Jane Smith' },
            ],
          },
          {
            id: 4,
            name: 'Sub Team 2',
            members: [
              { id: 7, name: 'John Doe' },
              { id: 8, name: 'Jane Smith' },
            ],
          },
        ],
      };

      const expectedTeamDto: TeamDto = {
        id: 1,
        name: 'Team A',
        members: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ],
        parentTeam: {
          id: 2,
          name: 'Parent Team',
        },
        subTeams: [
          { id: 3, name: 'Sub Team 1' },
          { id: 4, name: 'Sub Team 2' },
        ],
      };

      // Act
      const teamDto = TeamDto.fromEntity(teamEntity);

      // Assert
      expect(teamDto).toEqual(expectedTeamDto);
    });

    it('should convert a Team entity to a TeamDto object with undefined members', () => {
      // Arrange
      const teamEntity: Team = {
        id: 1,
        name: 'Team A',
        parentTeam: null,
        subTeams: [],
      };

      const expectedTeamDto: TeamDto = {
        id: 1,
        name: 'Team A',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      // Act
      const teamDto = TeamDto.fromEntity(teamEntity);

      // Assert
      expect(teamDto).toEqual(expectedTeamDto);
    });

    it('should convert a Team entity to a TeamDto object with undefined parentTeam', () => {
      // Arrange
      const teamEntity: Team = {
        id: 1,
        name: 'Team A',
        members: [],
        subTeams: [],
      };

      const expectedTeamDto: TeamDto = {
        id: 1,
        name: 'Team A',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      // Act
      const teamDto = TeamDto.fromEntity(teamEntity);

      // Assert
      expect(teamDto).toEqual(expectedTeamDto);
    });

    it('should convert a Team entity to a TeamDto object with undefined subTeams', () => {
      // Arrange
      const teamEntity: Team = {
        id: 1,
        name: 'Team A',
        members: [],
        parentTeam: null,
      };

      const expectedTeamDto: TeamDto = {
        id: 1,
        name: 'Team A',
        members: [],
        parentTeam: null,
        subTeams: [],
      };

      // Act
      const teamDto = TeamDto.fromEntity(teamEntity);

      // Assert
      expect(teamDto).toEqual(expectedTeamDto);
    });
  });
});
