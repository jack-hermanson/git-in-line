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
                type: "datetime",
                isNullable: false,
            },
            {
                name: "updated",
                type: "datetime",
                isNullable: true,
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
