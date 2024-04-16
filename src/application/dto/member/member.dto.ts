import { Member } from 'domain/entities';

export class MemberDto {
  id: number;
  name: string;

  static fromEntity(member: Member): MemberDto {
    return {
      id: member.id,
      name: member.name,
    };
  }
}
