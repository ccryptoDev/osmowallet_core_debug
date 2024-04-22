
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { TransactionGroup } from './transactionGroup.entity';
import { User } from './user.entity';

@Entity({name: 'referrals'})
export class Referral {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User,{onDelete: 'CASCADE',nullable: true})
  @JoinColumn({name: 'inviter_id',referencedColumnName: 'id'})
  inviter!: User

  @ManyToOne(() => User,{onDelete: 'CASCADE',nullable: true})
  @JoinColumn({name: 'invited_id',referencedColumnName: 'id'})
  invited!: User

  @Column({name: 'phone_number',nullable: true})
  phoneNumber!: string

  @Column({name: 'is_osmo_sponsor',default: false, type: 'boolean'})
  isOsmoSponsor!: boolean

  @OneToOne(() => TransactionGroup, {onDelete: 'CASCADE'},)
  @JoinColumn({name: 'transaction_group_id'})
  transactionGroup!: TransactionGroup

  @CreateDateColumn({name: 'created_at',type:'timestamp'})
  createdAt!: Date
}