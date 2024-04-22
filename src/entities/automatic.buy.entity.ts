
import { Status } from 'src/common/enums/status.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Coin } from './coin.entity';
import { User } from './user.entity';

@Entity({ name: 'automatic_buys' })
export class AutomaticBuy {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Coin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coin_id' })
  coin!: Coin

  @Column({ name: 'target_amount', default: 0.0, type: 'decimal', precision: 15, scale: 2 })
  targetAmount!: number

  @Column({ default: 0.0, type: 'decimal', precision: 15, scale: 2 })
  amount!: number

  @Column({ enum: Status })
  status!: Status

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date

  @Column({ name: 'expiry' })
  expiry!: Date
}