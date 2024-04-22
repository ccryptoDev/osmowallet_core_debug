

import { numberTransformer } from "src/common/transformers/decimal.transformer";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CountryWithdraw } from "./countryWithdraw.entity";
import { WithdrawalMethodCoin } from "./withdrawalMethodCoin.entity";

@Entity({name: 'withdrawal_methods'})
export class WithdrawalMethod{
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @Column({nullable: false})
    name!: string

    @Column({default: 0.0, type: 'decimal', precision: 15, scale:2,transformer: numberTransformer})
    min!: number

    @Column({default: 0.0, type: 'decimal', precision: 15, scale:2,transformer: numberTransformer})
    max!: number

    @Column({default: 0.0, type: 'decimal', precision: 15, scale:3,transformer: numberTransformer})
    fee!: number

    @Column({default: true})
    isActive!: boolean

    @Column({nullable: false, default: 'TITLE'})
    title!: string

    @Column({nullable: false})
    description!: string

    @Column({nullable: true, default: 'Inmediate'})
    estimateTime!: string

    @OneToMany(() => WithdrawalMethodCoin, (withdrawalMethodCoin) => withdrawalMethodCoin.withdrawalMethod)
    availableCoins!: WithdrawalMethodCoin[]

    @OneToMany(() => CountryWithdraw, (country) => country.withdrawlMethod)
    countries!: CountryWithdraw[]
}