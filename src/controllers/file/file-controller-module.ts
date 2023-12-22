import { fileModel } from "../../models/file/file-model-module";
import { FileController } from "./file-controller";
import { logger } from "../../shared/winston";

export const fileController = new FileController(fileModel, logger);
