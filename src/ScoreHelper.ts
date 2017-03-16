/*
* This is a helper class that contains static variables, which are used by the BenchMarker
* to estimate a score of a device at a given time. Each variable is a coefficient.
* The value of a coefficient describes the impact in the final score.
* */
export class ScoreHelper{
    static batteryLevelCoeff : number = 25;
    static batteryChargingCoeff : number = 20;
    static batteryDischargingTimeCoeff : number = 10;
    static memoryCoeff : number = 10;
    static isPluggedInCoeff : number = 40;
    static wifiCoeff : number = 40;
    static mobileDataCoeff : number = -20;
    static cpuCoeff : number = 20;
    static bandwidthCoeff : number = 30;
}
