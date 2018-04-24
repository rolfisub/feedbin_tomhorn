import { AbstractMapper } from "./mapper";

export abstract class AbstractModel {
    constructor(protected mapper: AbstractMapper) {}
}
