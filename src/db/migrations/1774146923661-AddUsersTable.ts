import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUsersTable1774146923661 implements MigrationInterface {
  private table = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'gen_random_uuid()',
        isPrimary: true,
        isGenerated: true,
        isNullable: false,
      },
      {
        name: 'firstName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'lastName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'username',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
