import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
@Index(["id", "name"])
export class Team {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: false,
  })
  public name: string;

  @ManyToMany(() => Member, (member: Member) => member.teams)
  @JoinTable()
  public members?: Member[];

  @ManyToOne(() => Team, (team: Team) => team.subTeams, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  public parentTeam?: Team | null;

  @OneToMany(() => Team, (team: Team) => team.parentTeam)
  public subTeams?: Team[];
}
