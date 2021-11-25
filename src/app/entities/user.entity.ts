import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  isVerify: boolean;

  @Column()
  createdAt: string;

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }

}
