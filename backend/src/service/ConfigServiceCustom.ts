import { App } from "../types/app";
import { injectable } from "tsyringe";

@injectable()
export class ConfigServiceCustom implements App.Config.Service {
    readonly port: number = 6000;
}