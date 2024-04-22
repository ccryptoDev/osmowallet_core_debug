import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'cashpak_users' })
export class CashpakUser {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @Column()
    customerId!: string

    @Column({ type: 'text' })
    @Exclude()
    token!: string

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User

    @Column()
    expiry!: Date

    @Column()
    phone!: string
}