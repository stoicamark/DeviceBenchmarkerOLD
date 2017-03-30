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
}

export interface Device{
    model?: string,
    type?: string,
    vendor?: string
}

export class Configuration{

    private _isMobile : boolean = false;
    private _battery : Battery = {level : 0.5};
    private _connection : Connection = { type : 'not supported' };
    private _os : OperatingSystem = {};
    private _device : Device = {};
    private _downloadSpeed : number = 0; //Mbps
    private readonly downSpeedRangeLimit = 25; //Mbps

    public getBattery() : Battery{
        return this._battery;
    }

    public getIsMobile() : boolean{
        return this._isMobile;
    }

    public setIsMobile(isMobile : boolean){
        this._isMobile = isMobile;
    }

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
        if(conn !== undefined && conn.type !== undefined){
            this._connection.type = conn.type;
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

    public setDownloadSpeed(downSpeedInMbps : number){
        this._downloadSpeed = downSpeedInMbps;
    }

    public toString(){
        return this._battery.toString() + this._connection.toString() + this._os.toString();
    }

    public getScore() : number {

        let score : number = 0;

        //these config parameters overwrites the score
        if(this._connection.type === 'cellular' || (this._battery.level < 0.15 && this._battery.charging === false))
            return score;

        score = sh.batteryLevelCoeff * this._battery.level +
                sh.batteryChargingCoeff * Number(this._battery.charging) +
                sh.batteryDischargingTimeCoeff * (this._battery.dischargingTime === Infinity ? 1 : this._battery.dischargingTime);

        switch(this._connection.type){
            case 'wifi' : score += sh.connectionTypeCoeff; break; //connectionTypeCoeff * 1
            case undefined : score += sh.connectionTypeCoeff * .8; break; //desktop browsers doesn't support connection.type
            default: break;
        }

        let downSpeedScore = 0;
        if(this._downloadSpeed < this.downSpeedRangeLimit){
            downSpeedScore = this._downloadSpeed / this.downSpeedRangeLimit;
        }else{
            downSpeedScore = 1;
        }

        score += sh.downSpeedCoeff * downSpeedScore;
        score += sh.memorySizeCoeff; //TODO: get device memory info from somewhere

        return score;
    }
}