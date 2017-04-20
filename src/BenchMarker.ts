import {Configuration} from "./Configuration";
import {UAParser} from "ua-parser-js";

declare function require(name:string);
declare let navigator : {userAgent : any, connection : any};

let UAP = require("ua-parser-js");

export interface IConfigurationEventHandler{
    (conf?: Configuration) : void;
}

export interface IBenchMarkerListener{
    on(handler : IConfigurationEventHandler) : void;
    off(handler : IConfigurationEventHandler) : void;
    allOff() : void;
    hasListener() : boolean;
}

export class BenchMarker implements IBenchMarkerListener{

    private handlers : IConfigurationEventHandler[] = [];
    public config : Configuration = new Configuration();

    public on(handler : IConfigurationEventHandler) {
        this.handlers.push(handler);

        this.measureConnectionSpeed();
        this.fetchConnectionData();
        this.fetchBatteryData();

        let parser : UAParser = new UAP(navigator.userAgent);

        this.config.setOsInfo(parser.getOS());
        this.config.setDevice(parser.getDevice());
    }

    public off(handler : IConfigurationEventHandler){
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public allOff(){
        this.handlers  = [];
    }

    public trigger(): void {
        if(this.handlers){
            this.handlers.slice(0).forEach(h => h(this.config)); //Slice is for shallow copy. The original array won't be modified.
        }
    }

    public hasListener(): boolean {
        return this.handlers.length !== 0;
    }

    private measureConnectionSpeed(){
        let imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
        let downloadSize = 5245329; //bytes
        let download = new Image();
        let startTime : number, endTime : number, duration : number;
        let bitsLoaded = downloadSize * 8;

        startTime = (new Date()).getTime();
        let cacheBuster = "?nnn=" + startTime;

        download.src = imageAddr + cacheBuster;

        download.onload = () => {
            endTime = (new Date()).getTime();
            duration = (endTime - startTime) / 1000;
            let speedbps = Number((bitsLoaded / duration).toFixed(2));
            let speedkbps = Number((speedbps / 1024).toFixed(2));
            let speedmbps = Number((speedkbps / 1024).toFixed(2));
            this.config.setDownloadSpeed(speedmbps);
            this.trigger();
        };
    }

    private handleBattery(battery){
        this.config.setBattery(battery);
        this.trigger();
    }

    private fetchBatteryData() {
        if(typeof navigator['getBattery'] === "undefined"){
            console.log('navigator.getBattery() is undefined');
            return;
        }
        navigator['getBattery']().then((battery) => {
            this.handleBattery(battery);
            battery.onchargingchange = () => {this.handleBattery(battery);};
            battery.onlevelchange = () => {this.handleBattery(battery);};
            battery.ondischargingtimechange = () => {this.handleBattery(battery);};
        });
    }

    private fetchConnectionData(){
        this.config.setConnection(navigator.connection);
    }
}