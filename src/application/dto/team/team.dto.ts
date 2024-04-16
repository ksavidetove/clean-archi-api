import { MemberDto } from '../member/member.dto';
import { Team } from 'domain/entities';

class SimpleTeamDto {
  id: number;
  name: string;

  static fromEntity(team: Team): SimpleTeamDto {
    return {
      id: team.id,
      name: team.name,
    };
  }
}

export class TeamDto {
  id: number;
  name: string;
  members: MemberDto[];
  parentTeam: SimpleTeamDto;
  subTeams: SimpleTeamDto[];

  static fromEntity(team: Team): TeamDto {
    return {
      id: team.id,
      name: team.name,
      members:
        team.members?.map((member) => MemberDto.fromEntity(member)) ?? [],
      parentTeam: team.parentTeam
        ? SimpleTeamDto.fromEntity(team.parentTeam)
        : null,
      subTeams:
        team.subTeams?.map((subTeam) => SimpleTeamDto.fromEntity(subTeam)) ??
        [],
    };
  }
}
