import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'domain/entities';
import { IMemberRepository } from 'domain/repositories';
import { In, Repository } from 'typeorm';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async exists(id: number): Promise<boolean> {
    return await this.memberRepository.existsBy({ id });
  }

  async findOneById(id: number): Promise<Member> {
    return this.memberRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<Member[]> {
    return this.memberRepository.find({ where: { id: In(ids) } });
  }

  async create(name: string): Promise<Member> {
    return this.memberRepository.save({ name });
  }

  async update(id: number, member: Member): Promise<Member | undefined> {
    await this.memberRepository.update(id, member);
    return this.memberRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.memberRepository.delete(id);
    return result.affected > 0;
  }
}
