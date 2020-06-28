import { model } from "mongoose";
import { IEntityDocument } from "./entities.types";
import EntitiesSchema from "./entities.schema";
export const EntityModel = model<IEntityDocument>("entity", EntitiesSchema);