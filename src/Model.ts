/**
 * Created by LenovoZ510 on 2017. 03. 16..
 */
export interface Battery{
    charging?: boolean;
    chargingTime?: number;
    dischargingTime?: number;
    level?: number;
}

export interface OperatingSystem{
    name?: string;
    version?: string;
}

export interface Connection{
    type?: string;
    downlinkMax?: number;
}

export interface Device{
    model?: string,
    type?: string,
    vendor?: string
}

export class Configuration{

    private _battery : Battery = {level : 0.5};
    private _connection : Connection = { type : 'not supported' };
    private _os : OperatingSystem = {};
    private _device : Device = {};
    private _


    public getBattery() : Battery{
        return this._battery;
    }

    public constructor(){}

    /*BatteryManager - navigator.battery return value*/
    public setBattery(batteryManager : Battery) {
        this._battery.charging = batteryManager.charging;
        this._battery.chargingTime = batteryManager.chargingTime;
        this._battery.dischargingTime = batteryManager.dischargingTime;
        this._battery.level = batteryManager.level;
    }

    public getConnection() {
        return this._connection;
    }

    /*NetworkInformation - navigator.connection return value*/
    public setConnection(conn : Connection) {
        if(conn === undefined) {
            this._connection.type = 'not supported';
            this._connection.downlinkMax = 0;
        }else{
            this._connection.type = conn.type === undefined ? 'not supported' : conn.type;
            this._connection.downlinkMax = conn.downlinkMax === undefined ? 0 : conn.downlinkMax;
        }
    }

    public getOsInfo() {
        return this._os;
    }

    public setOsInfo(os : OperatingSystem) {
        this._os.name = os.name;
        this._os.version = os.version;
    }

    public getDevice(){
        return this._device;
    }

    public setDevice(device : Device){
        this._device.type = device.type;
        this._device.model = device.model;
        this._device.vendor = device.vendor;
    }

    public toString(){
        return this._battery.toString() + this._connection.toString() + this._os.toString();
    }
}