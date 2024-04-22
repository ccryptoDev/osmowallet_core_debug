import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({name: 'ibex_accounts'})
export class IbexAccount {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;
  
  @OneToOne(() => User,{onDelete: 'CASCADE'})
  @JoinColumn({name: 'user_id'})
  user!: User;

  @Column()
  account!: string

  @Column()
  name!: string

  @Column({name: 'username_id',nullable: true})
  usernameId!: string

  @CreateDateColumn({name: 'created_at',type:'timestamp'})
  createdAt!: Date

  @UpdateDateColumn({name: 'updated_at',type:'timestamp'})
  updatedAt!: Date
}