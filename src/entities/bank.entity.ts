


import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity({ name: 'banks' })
export class Bank {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id!: string;

  @Column()
  name!: string

  @Column({ name: 'code', default: 0 })
  code!: number

  @ManyToOne(() => Country, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id', foreignKeyConstraintName: 'banks_country_fk' })
  country!: Country

}