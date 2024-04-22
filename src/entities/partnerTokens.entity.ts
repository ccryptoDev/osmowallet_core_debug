
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity({name:'partner_tokens'})
export class PartnerToken {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => App, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'app_id'})
  app!: App

  @Column({name: 'refresh_token',type: 'text'})
  refreshToken!: string
}