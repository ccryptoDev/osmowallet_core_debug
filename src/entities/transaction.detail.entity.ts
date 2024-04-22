
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({name: 'transaction_details'})
export class TransactionDetail {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @OneToOne(() => Transaction,{onDelete: 'CASCADE'})
  @JoinColumn({name: 'transaction_id'})
  transaction!: Transaction

  @Column({name: 'ibex_transaction_id',nullable: true})
  ibexTransactionId!: string

  @Column({length: 1000,nullable: true})
  address!: string

  @Column({name: 'proof',nullable: true, length: 1000})
  proofUrl!: string

  @Column({name: 'proof_path',nullable: true})
  @Exclude()
  proofPath!: string

  @Column({name: 'proof_expiry', nullable: true})
  @Exclude()
  proofExpiry!: Date

  @Column({type: 'simple-json',nullable: true})
  metadata!: object
}