



import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Country } from "./country.entity";
import { Feature } from "./feature.entity";


@Entity({name: 'feature_countries'})
export class FeatureCountry{
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @ManyToOne(() => Feature,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'feature_id'})
    feature!: Feature

    @ManyToOne(() => Country,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'country_id', referencedColumnName: 'id', foreignKeyConstraintName: 'feature_countries_country_fk'})
    country!: Country

    @Column({default: true})
    active!: boolean

}