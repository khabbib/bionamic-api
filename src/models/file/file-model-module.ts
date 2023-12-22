import { postgresqlClient } from "../../shared/postgresql-client";
import { FileModel } from "./file-model";
import { IFileModel } from "./file-model-interfaces";
import { logger } from "../../shared/winston";

export const fileModel: IFileModel = new FileModel(postgresqlClient, logger);
