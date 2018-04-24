import { LiveController } from "../live/live.controller";
import { LiveMapper } from "../live/live.mapper";
import { LiveModel } from "../live/live.model";

const mapper: LiveMapper = new LiveMapper();
const model: LiveModel = new LiveModel(mapper);
const controller: LiveController = new LiveController(model);

export default {
    mapper,
    model,
    controller
};
