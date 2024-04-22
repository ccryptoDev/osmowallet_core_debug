import { Partner } from "src/common/enums/partner.enum";
import { SendGloballyPartner } from "src/modules/send-globally/enums/partner.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Country } from "./country.entity";

@Entity({name: 'global_payment_countries'})
export class GlobalPaymentCountry {
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id!: string;

    @Column({name: 'is_active',default: true})
    isActive!: boolean

    @OneToOne(() => Country,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'country_id', referencedColumnName: 'id', foreignKeyConstraintName: 'global_payment_countries_country_fk'})
    country!: Country

    @Column({enum: SendGloballyPartner})
    partner!: Partner
}