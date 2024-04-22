
import { Platform } from "src/common/enums/platform.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Feature } from "./feature.entity";


@Entity({ name: 'feature_platforms' })
export class FeaturePlatform {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @ManyToOne(() => Feature, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'feature_id' })
    feature!: Feature

    @Column({ enum: Platform, nullable: true })
    platform!: Platform

    @Column({ default: true })
    active!: boolean

}