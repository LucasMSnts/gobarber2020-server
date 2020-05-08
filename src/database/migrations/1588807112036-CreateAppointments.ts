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
            type: 'uuid', // postgres
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // postgres
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // Só funciona no Postgres
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
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
