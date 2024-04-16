import { Member } from 'domain/entities/member.entity';

export interface IMemberRepository {
  findOneById(id: number): Promise<Member | null>;
  findByIds(ids: number[]): Promise<Member[]>;
  create(name: string): Promise<Member>;
  update(id: number, member: Partial<Member>): Promise<Member | null>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}

export const IMemberRepository = Symbol('IMemberRepository');
