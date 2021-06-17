import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Joi from "joi";

@Entity({ name: "account" })
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    token?: string;
}

const usernameKey = Joi.string().min(2).required();

export const newAccountSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        username: usernameKey,
        password: Joi.string().min(2).required(),
    });

export const editAccountSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        username: usernameKey,
    });
