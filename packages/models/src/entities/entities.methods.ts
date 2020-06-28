import { Document } from "mongoose";
import { IEntityDocument } from "./entities.types";

export async function setLastUpdated(this: IEntityDocument):
Promise<void> {
    const now = new Date();
    if (!this.date_updated || this.date_updated < now) {
        this.date_updated = now;
        await this.save();
    }
}

export async function sameEntityName(this: IEntityDocument):
Promise<Document[]>{
    return this.model("entity").find({ name: this.name });
}