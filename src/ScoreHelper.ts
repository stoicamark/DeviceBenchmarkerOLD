/*
* This is a helper class that contains static variables, which are used by the BenchMarker
* to estimate a score of a device at a given time. Each variable is a coefficient.
* The value of a coefficient describes the impact in the final score.
* */
export class ScoreHelper{
    static batteryLevelCoeff : number = .15;
    static batteryChargingCoeff : number = .20;
    static batteryDischargingTimeCoeff : number = .15;
    static memorySizeCoeff : number = .05;
    static connectionTypeCoeff : number = .30;
    static downSpeedCoeff : number = .15;
}
