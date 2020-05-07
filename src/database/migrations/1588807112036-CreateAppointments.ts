// Criar migration
// yarn typeorm migration:create -n CreateAppointments

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1588807112036
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // postgres
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // Só funciona no Postgres
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

// Rodar migration
// yarn typeorm migration:run

// Reverter migration
// yarn typeorm migration:revert

// Mostrar migration criadas
// yarn typeorm migration:show
