// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum Gender {
  M='male',
  F='female',
  O='other'
}

@Entity({
  name: 'profiles'
})
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'set',
    enum: Gender,
    nullable: true
  })
  gender: Gender;

  @Column({
    unique: true,
    type: 'char',
    length: 5,
    nullable: false
  })
  phonePrefixCode: string;
  
  @Column({
    type: 'char',
    length: 15,
    nullable: false
  })
  cellphoneNumber: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true
  })
  picture: string;

  @OneToOne(() => User, user => user.profile, {
    primary: true,
    nullable: true
  })
  user: User;

}
