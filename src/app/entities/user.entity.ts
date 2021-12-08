import { hashPassword } from "@foal/core";
import { UserWithPermissions } from "@foal/typeorm";
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Profile } from "./profile.entity";

@Entity({
	name: "users",
})
export class User extends UserWithPermissions {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		type: "varchar",
		length: 70,
		nullable: false,
	})
	email: string;

	@Column({
		type: "varchar",
		length: 450,
		nullable: true,
	})
	password: string;

	@Column({
		type: "char",
		length: 40,
		nullable: false,
	})
	name: string;

	@Column({
		type: "char",
		length: 60,
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "boolean",
		default: false,
	})
	isVerify: boolean;

	@Column({
		type: "timestamp",
		nullable: true,
	})
	createdAt: Date;

	@OneToOne(() => Profile, (profile) => profile.user, {
		primary: true,
		nullable: true,
	})
	@JoinColumn()
	profile: Profile;

	async setPassword(password: string): Promise<void> {
		this.password = await hashPassword(password);
	}
}

export { Permission, Group } from "@foal/typeorm";