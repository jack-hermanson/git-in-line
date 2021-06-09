import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import Joi from "joi";

@Entity({name: "account"})
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column()
    token?: string;
}

export interface EditAccountRequest {
    username: string;
}

export interface NewAccountRequest extends EditAccountRequest {
    password: string;
}

export interface LoginRequest extends NewAccountRequest {}

export const newAccountSchema = Joi.object().options({abortEarly: false}).keys({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(2).required()
});