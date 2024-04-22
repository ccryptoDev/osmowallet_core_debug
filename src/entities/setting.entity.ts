import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'settings'})
export class Setting {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @Column()
  type!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  value!: string;
}