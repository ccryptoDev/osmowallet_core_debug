
import { AccountType } from 'src/common/enums/accountType.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ name: 'account_type', enum: AccountType, default: AccountType.INDIVIDUAL })
  accountType!: AccountType

  @Column({ nullable: true })
  alias!: string

}