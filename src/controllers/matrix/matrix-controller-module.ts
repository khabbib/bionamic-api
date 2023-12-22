import { matrixModel } from "../../models/matrix/matrix-model-module";
import { MatrixController } from "./matrix-controller";
import { logger } from "../../shared/winston";

export const matrixController = new MatrixController(matrixModel, logger);
