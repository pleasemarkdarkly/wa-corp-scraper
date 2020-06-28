import { IEntityDocument, IEntityModel } from './entities.types';

export async function findOneOrCreate(
    this: IEntityModel,
    entityId: string,
    name: string, 
    type: string | null, 
    status?: boolean,
    ubi?: string,
    principal_office?: string,
    principal_agent_name?: string,
    principal_agent_consent?: string,
    principal_agent_mailing_address?: string,
    date_filed?: string,
    effective_date?: Date,
    principal_office_phone?: string,
    principal_office_email?: string,
    principal_office_street_address?: string,
    governor_first_name?: string,
    governor_last_name?: string,
    nature_of_business?: string,
    return_address_for_filing?: string,
    return_address_attention?: string,
    signer_last_name?: string,
    signer_first_name?: string,
    signer_title?: string,
    initial_report_work_order?: string,
    initial_report_received_date?: string,
    initial_report_amount?: string,
    date_entry?: Date,
    date_updated?: Date
): Promise<IEntityDocument> {
    const record = await this.findOne({ entityId });
    if (record) {
        return record;
    } else {
        this.create({ 
            name, 
            type, 
            status,
            ubi,
            principal_office,
            principal_agent_name,
            principal_agent_consent,
            principal_agent_mailing_address,
            date_filed,
            effective_date,
            principal_office_phone,
            principal_office_email,
            principal_office_street_address,
            governor_first_name,
            governor_last_name,
            nature_of_business,
            return_address_for_filing,
            return_address_attention,
            signer_last_name,
            signer_first_name,
            signer_title,
            initial_report_work_order,
            initial_report_received_date,
            initial_report_amount
        });
    }
}

export async function findByNatureOfBusiness(
    this: IEntityModel,
    keyword?: string
): Promise<IEntityDocument[]>{
    return this.find({ $search: { $text: keyword }
    });
}