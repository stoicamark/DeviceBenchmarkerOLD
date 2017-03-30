/*
* This is a helper class that contains static readonly variables, which are used by the BenchMarker
* to estimate a score of a device at a given time. Each variable is a coefficient.
* The value of a coefficient describes the impact in the final score.
* */
export class ScoreHelper{
    static readonly batteryLevelCoeff : number = .15;
    static readonly batteryChargingCoeff : number = .20;
    static readonly batteryDischargingTimeCoeff : number = .15;
    static readonly memorySizeCoeff : number = .05;
    static readonly connectionTypeCoeff : number = .30;
    static readonly downSpeedCoeff : number = .15;
}
