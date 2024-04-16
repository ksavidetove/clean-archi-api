import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'domain/entities';
import { ITeamRepository } from 'domain/repositories';
import { Repository } from 'typeorm';
import { RepositoryOptions } from 'domain/repositories/options';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async exists(id: number): Promise<boolean> {
    return await this.teamRepository.existsBy({ id });
  }

  async find(query: Partial<Team>): Promise<Team[]> {
    return this.teamRepository.find({ where: query });
  }

  async findById(
    id: number,
    options: RepositoryOptions,
  ): Promise<Team | undefined> {
    return this.teamRepository.findOne({ where: { id }, ...options });
  }

  async create(name: string): Promise<Team> {
    return this.teamRepository.save({ name });
  }

  async update(id: number, team: Partial<Team>): Promise<Team> {
    return this.teamRepository.save({ id, ...team });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected > 0;
  }
}
