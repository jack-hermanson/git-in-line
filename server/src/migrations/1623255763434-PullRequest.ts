import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";
import { idColumn } from "../utils/utils";
import { Priority, PrStatus } from "../../../shared/src/enums";

export class PullRequest1623255763434 implements MigrationInterface {
    pullRequest = new Table({
        name: "pull_request",
        columns: [
            idColumn,
            {
                name: "created",
                type: "timestamp",
                isNullable: false,
                default: "CURRENT_TIMESTAMP",
            },
            {
                name: "updated",
                type: "timestamp",
                isNullable: true,
                default: "CURRENT_TIMESTAMP",
            },
            {
                name: "gitHubUrl",
                type: "varchar",
                isNullable: false,
            },
            {
                name: "accountId",
                type: "int",
                isNullable: false,
            },
            {
                name: "status",
                type: "int",
                isNullable: false,
                default: PrStatus.PENDING,
            },
            {
                name: "priority",
                type: "int",
                isNullable: false,
                default: Priority.MED,
            },
            {
                name: "jiraUrl",
                type: "varchar",
                isNullable: true,
            },
            {
                name: "notes",
                type: "varchar",
                isNullable: true,
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.pullRequest, true);
        await queryRunner.createForeignKeys(this.pullRequest, [
            new TableForeignKey({
                columnNames: ["accountId"],
                referencedTableName: "account",
                referencedColumnNames: ["id"],
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.pullRequest, true, true);
    }
}
