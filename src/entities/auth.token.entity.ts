import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({name:'auth_tokens'})
export class AuthToken {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'user_id'})
  user!: User

  @Column({name: 'refresh_token',type: 'text'})
  refreshToken!: string
}