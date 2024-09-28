import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesUpdate1727506627537 implements MigrationInterface {
    name = 'EntitiesUpdate1727506627537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`phone\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`phone\` varchar(255) NOT NULL`);
    }

}
