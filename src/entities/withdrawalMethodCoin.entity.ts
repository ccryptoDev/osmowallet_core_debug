import { Exclude } from "class-transformer";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Coin } from "./coin.entity";
import { WithdrawalMethod } from "./withdrawalMethod.entity";

@Entity({name: 'withdrawal_method_coins'})
export class WithdrawalMethodCoin {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @ManyToOne(() => WithdrawalMethod,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'withdrawal_method_id'})
    @Exclude()
    withdrawalMethod!: WithdrawalMethod

    @ManyToOne(() => Coin,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'coin_id'})
    coin!: Coin
}