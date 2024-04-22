

import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { FeatureCountry } from "./featureCountry.entity";
import { FeaturePlatform } from "./featurePlatform.entity";


@Entity({ name: 'features' })
export class Feature {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @Column({ nullable: false })
    name!: string

    @Column({ name: 'is_active', default: true })
    isActive!: boolean

    @OneToMany(() => FeaturePlatform, (featurePlatform) => featurePlatform.feature)
    platforms!: FeaturePlatform[]

    @OneToMany(() => FeatureCountry, (featureCountry) => featureCountry.feature)
    countries!: FeatureCountry[]

}