
import { BankAccountType } from 'src/common/enums/bankAccountType.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Bank } from './bank.entity';
import { Coin } from './coin.entity';
import { User } from './user.entity';
@Entity({ name: 'bank_accounts' })
export class BankAccount {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ name: 'account_type', enum: BankAccountType, default: BankAccountType.AHORROS, nullable: true })
  bankAccountType!: BankAccountType

  @Column({ name: 'account_number' })
  accountNumber!: string

  @Column({ name: 'account_holder' })
  accountHolder!: string

  @ManyToOne(() => Coin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coin_id' })
  coin!: Coin

  @ManyToOne(() => Bank, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bank_id' })
  bank!: Bank

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date
}