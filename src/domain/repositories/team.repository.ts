import { Team } from 'domain/entities/team.entity';
import { RepositoryOptions } from './options';

export interface ITeamRepository {
  findById(id: number, options?: RepositoryOptions): Promise<Team | null>;
  find(query: Partial<Team>): Promise<Team[]>;
  create(name: string): Promise<Team>;
  update(id: number, team: Partial<Team>): Promise<Team>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}

export const ITeamRepository = Symbol('ITeamRepository');
