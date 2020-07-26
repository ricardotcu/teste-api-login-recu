import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    nome: string;

    @Column("varchar", {
        unique: true,
    })
    email: string;

    @Column("varchar")
    senha: string;

}