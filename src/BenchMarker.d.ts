import { Configuration } from "./Configuration";
import { Promise } from "es6-promise";
export interface IConfigurationEventHandler {
    (conf?: Configuration): any;
}
export interface IBenchMarkerListener {
    on(handler: IConfigurationEventHandler): void;
    off(handler: IConfigurationEventHandler): void;
    allOff(): void;
    hasListener(): boolean;
}
export declare class BenchMarker implements IBenchMarkerListener {
    private handlers;
    config: Configuration;
    on(handler: IConfigurationEventHandler): void;
    off(handler: IConfigurationEventHandler): void;
    allOff(): void;
    trigger(): void;
    hasListener(): boolean;
    private measureConnectionSpeed();
    private handleBattery(battery);
    private fetchBatteryData();
    private fetchConnectionData();
    getascore(): Promise<number>;
    asycAwait(ms: number): Promise<{}>;
}
