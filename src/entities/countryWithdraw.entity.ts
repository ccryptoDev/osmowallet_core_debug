import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { WithdrawalMethod } from "./withdrawalMethod.entity";


@Entity({ name: 'country_withdraws' })
export class CountryWithdraw {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @ManyToOne(() => WithdrawalMethod, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'withdraw_id' })
    withdrawlMethod!: WithdrawalMethod

    @Column({ name: 'country_code', default: 'GT' })
    countryCode!: string

    @Column({ name: 'is_active', default: true })
    isActive!: boolean

}