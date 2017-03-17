/**
 * Created by LenovoZ510 on 2017. 03. 16..
 */
import {ScoreHelper as sh} from "./ScoreHelper";

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
    private _downloadSpeed : number = 0; //kbps

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

    public getDownloadSpeed(){
        return this._downloadSpeed;
    }

    public setDownloadSpeed(downSpeedInKbps : number){
        this._downloadSpeed = downSpeedInKbps;
    }

    public toString(){
        return this._battery.toString() + this._connection.toString() + this._os.toString();
    }

    public getScore() : number {

        let score : number;

        score = sh.batteryLevelCoeff * this._battery.level +
                sh.batteryChargingCoeff * Number(this._battery.charging) +
                sh.batteryDischargingTimeCoeff * this._battery.dischargingTime;

        switch(this._connection.type){
            case 'wifi' : score += sh.wifiCoeff; break;
            case 'cellular' : score += sh.cellularDataCoeff; break;
            default: break;
        }

        score += sh.downSpeedCoeff * this._downloadSpeed;

        return score;
    }
}