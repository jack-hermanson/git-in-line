import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import Joi from "joi";
import {Priority, PrStatus} from "../../../shared/src/enums";

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

    @Column({nullable: false, type: "int", default: PrStatus.PENDING})
    status: PrStatus;

    @Column({nullable: false, type: "int", default: Priority.MED})
    priority: Priority;

    @Column({nullable: true})
    jiraUrl?: string;

    @Column({nullable: true})
    notes?: string;

}

const baseSchemaKeys = {
    gitHubUrl: Joi.string().uri().required(),
    priority: Joi.number().integer().optional().min(Priority.HIGH).max(Priority.LOW),
    jiraUrl: Joi.string().uri().optional(),
    notes: Joi.string().optional()
};

export const newPrSchema = Joi.object().options({abortEarly: false}).keys(baseSchemaKeys);

export const editPrSchema = Joi.object().options({abortEarly: false, allowUnknown: true}).keys({
    ...baseSchemaKeys,
    status: Joi.number().required().min(PrStatus.PENDING).max(PrStatus.APPROVED)
});
