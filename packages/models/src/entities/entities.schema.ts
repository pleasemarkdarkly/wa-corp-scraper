import { Schema } from "mongoose";
import { findOneOrCreate, findByNatureOfBusiness } from "./entities.statics";
import { setLastUpdated, sameEntityName } from "./entities.methods";

/*
    text index fields:
        name
        registered_agent_name
        governor_first_name, governor_last_name
        signer_last_name, signer_first_name
        nature_of_business 
*/

const EntitySchema = new Schema ({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, required: true },
    ubi: { type: String, required: true },
    principal_office: { type: String, required: true },
    registered_agent_name: { type: String, required: true },
    registered_agent_consent: { type: String, required: true },
    registered_agent_mailing_address: { type: String, required: true },
    date_filed: { type: Date, required: true },
    effective_date: { type: Date, required: true },
    principal_office_phone: { type: String, required: true },
    principal_office_email: { type: String, required: true },
    principal_office_street_address: { type: String, required: true },
    governor_first_name: { type: String, required: true },
    governor_last_name: { type: String, required: true },
    nature_of_business: { type: String, required: true },
    return_address_for_filing: { type: String, required: false },
    return_address_attention: { type: String, required: false },
    signer_last_name: { type: String, required: false },
    signer_first_name: { type: String, required: false },
    signer_title: { type: String, required: false },
    initial_report_work_order: { type: String, required: false},
    initial_report_received_date: { type: String, required: false },
    initial_report_amount: { type: String, required: false },
    date_entry: { type: Date, default: new Date() },
    date_updated: { type: Date, default: new Date() }
});

/*
const EntityNatureSchema = new Schema ({
    name: { type: String, required: true },
    nature_of_business: { type: String, required: true }
});
*/

EntitySchema.statics.findOneOrCreate = findOneOrCreate;
EntitySchema.statics.findByNatureOfBusiness = findByNatureOfBusiness;

EntitySchema.methods.setLastUpdated = setLastUpdated;
EntitySchema.methods.sameEntityName = sameEntityName;

export default EntitySchema;