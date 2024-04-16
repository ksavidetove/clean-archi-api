import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @ManyToMany(() => Team, (team: Team) => team.members, { nullable: false })
  public teams?: Team[];
}
