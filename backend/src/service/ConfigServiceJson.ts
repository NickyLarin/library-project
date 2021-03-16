import { App } from "../types/app";
import { injectable } from "tsyringe";

@injectable()
export class ConfigServiceJson implements App.Config.Service {
    readonly port: number;
    constructor() {
        const data = require('../../config/config.json')
        this.port = data.port;
    }
}