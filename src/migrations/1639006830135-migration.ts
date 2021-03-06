import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1639006830135 implements MigrationInterface {
    name = 'migration1639006830135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `codeName` varchar(100) NOT NULL, UNIQUE INDEX `IDX_390215abbc2901e2e623a69a03` (`codeName`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(80) NOT NULL, `codeName` varchar(100) NOT NULL, UNIQUE INDEX `IDX_c13ca26406d3e9be800054b9a4` (`codeName`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(70) NOT NULL, `password` varchar(450) NULL, `name` char(40) NOT NULL, `lastName` char(60) NOT NULL, `isVerify` tinyint NOT NULL DEFAULT 0, `createdAt` timestamp NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group_permissions_permission` (`groupId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_24022d7e409de3835f25603d35` (`groupId`), INDEX `IDX_0777702b851f7662e2678b4568` (`permissionId`), PRIMARY KEY (`groupId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_groups_group` (`usersId` int NOT NULL, `groupId` int NOT NULL, INDEX `IDX_8a8d151561d34fb00229f76a32` (`usersId`), INDEX `IDX_edb469b8953050465bd0ca165b` (`groupId`), PRIMARY KEY (`usersId`, `groupId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_user_permissions_permission` (`usersId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_4593fcab743a2df2e3de542d20` (`usersId`), INDEX `IDX_592d12b309170a3773c4b84463` (`permissionId`), PRIMARY KEY (`usersId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `group_permissions_permission` ADD CONSTRAINT `FK_24022d7e409de3835f25603d35d` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `group_permissions_permission` ADD CONSTRAINT `FK_0777702b851f7662e2678b45689` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_groups_group` ADD CONSTRAINT `FK_8a8d151561d34fb00229f76a325` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_groups_group` ADD CONSTRAINT `FK_edb469b8953050465bd0ca165b9` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_user_permissions_permission` ADD CONSTRAINT `FK_4593fcab743a2df2e3de542d20a` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_user_permissions_permission` ADD CONSTRAINT `FK_592d12b309170a3773c4b84463e` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_user_permissions_permission` DROP FOREIGN KEY `FK_592d12b309170a3773c4b84463e`");
        await queryRunner.query("ALTER TABLE `users_user_permissions_permission` DROP FOREIGN KEY `FK_4593fcab743a2df2e3de542d20a`");
        await queryRunner.query("ALTER TABLE `users_groups_group` DROP FOREIGN KEY `FK_edb469b8953050465bd0ca165b9`");
        await queryRunner.query("ALTER TABLE `users_groups_group` DROP FOREIGN KEY `FK_8a8d151561d34fb00229f76a325`");
        await queryRunner.query("ALTER TABLE `group_permissions_permission` DROP FOREIGN KEY `FK_0777702b851f7662e2678b45689`");
        await queryRunner.query("ALTER TABLE `group_permissions_permission` DROP FOREIGN KEY `FK_24022d7e409de3835f25603d35d`");
        await queryRunner.query("DROP INDEX `IDX_592d12b309170a3773c4b84463` ON `users_user_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_4593fcab743a2df2e3de542d20` ON `users_user_permissions_permission`");
        await queryRunner.query("DROP TABLE `users_user_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_edb469b8953050465bd0ca165b` ON `users_groups_group`");
        await queryRunner.query("DROP INDEX `IDX_8a8d151561d34fb00229f76a32` ON `users_groups_group`");
        await queryRunner.query("DROP TABLE `users_groups_group`");
        await queryRunner.query("DROP INDEX `IDX_0777702b851f7662e2678b4568` ON `group_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_24022d7e409de3835f25603d35` ON `group_permissions_permission`");
        await queryRunner.query("DROP TABLE `group_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_c13ca26406d3e9be800054b9a4` ON `group`");
        await queryRunner.query("DROP TABLE `group`");
        await queryRunner.query("DROP INDEX `IDX_390215abbc2901e2e623a69a03` ON `permission`");
        await queryRunner.query("DROP TABLE `permission`");
    }

}
