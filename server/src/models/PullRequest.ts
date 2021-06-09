import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import Joi from "joi";
import {Priority, PrStatus} from "../utils/types";

@Entity({name: "pull_request"})
export class PullRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({nullable: false})
    created: Date;

    @UpdateDateColumn({nullable: true})
    updated?: Date;

    @Column({nullable: false})
    gitHubUrl: string;

    @Column({nullable: false, type: "int"})
    accountId: number;

    @Column({nullable: false, type: "enum", enum: PrStatus, default: PrStatus.PENDING})
    status: PrStatus;

    @Column({nullable: false, type: "enum", enum: Priority, default: Priority.MED})
    priority: Priority;

    @Column({nullable: true})
    jiraUrl?: string;

    @Column({nullable: true})
    notes?: string;

}

export interface PullRequestRequest {
    gitHubUrl: string;
    accountId: number;
    priority: Priority;
    jiraUrl?: string;
    notes?: string;
}

export const pullRequestSchema = Joi.object().options({abortEarly: false}).keys({
    gitHubUrl: Joi.string().uri().required(),
    accountId: Joi.number().integer().required().positive(),
    priority: Joi.number().integer().required().min(Priority.HIGH).max(Priority.LOW),
    jiraUrl: Joi.string().optional(),
    notes: Joi.string().optional()
});
