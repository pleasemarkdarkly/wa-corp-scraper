import { Document, Model } from "mongoose";

export interface IEntity {
    name: string;
    type: string;
    status: boolean;
    ubi: string;
    principal_office: string;
    registered_agent_name: string;
    registered_agent_consent: string;
    registered_agent_mailing_address: string;
    date_filed: Date;
    effective_date: Date;
    principal_office_phone: string;
    principal_office_email: string;
    principal_office_street_address: string;
    governor_first_name: string;
    governor_last_name: string;
    nature_of_business: string;
    return_address_for_filing?: string;
    return_address_attention?: string;
    signer_last_name?: string;
    signer_first_name?: string;
    signer_title?: string;
    initial_report_work_order?: string;
    initial_report_received_date?: string;
    initial_report_amount?: string;
    date_entry?: Date;
    date_updated?: Date;
}

export interface IEntityDocument extends IEntity, Document {
    setLastUpdated: (this: IEntityDocument) => Promise<void>;
    sameEntityName: (this: IEntityDocument) => Promise<Document[]>;
}
export interface IEntityModel extends Model<IEntityDocument> {
    findOneOrCreate: (
        this: IEntityModel, {
            name,
            type,
            status
        }: { name: string; type: string; status: boolean }
    ) => Promise<IEntityDocument>;
    findByNatureOfBusiness: (
        this: IEntityModel,
        keyword?: string
    ) => Promise<IEntityDocument[]>;
}
