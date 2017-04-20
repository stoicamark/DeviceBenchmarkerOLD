export interface Battery {
    charging?: boolean;
    chargingTime?: number;
    dischargingTime?: number;
    level?: number;
}
export interface OperatingSystem {
    name?: string;
    version?: string;
}
export interface Connection {
    type?: string;
}
export interface Device {
    model?: string;
    type?: string;
    vendor?: string;
}
export declare class Configuration {
    private _battery;
    private _connection;
    private _os;
    private _device;
    private _downloadSpeed;
    private readonly downSpeedRangeLimit;
    getBattery(): Battery;
    setBattery(batteryManager: Battery): void;
    getConnection(): Connection;
    setConnection(conn: Connection): void;
    getOsInfo(): OperatingSystem;
    setOsInfo(os: OperatingSystem): void;
    getDevice(): Device;
    setDevice(device: Device): void;
    getDownloadSpeed(): any;
    setDownloadSpeed(downSpeedInMbps: number): void;
    getScore(): number;
    getIsMobile(): boolean;
}
