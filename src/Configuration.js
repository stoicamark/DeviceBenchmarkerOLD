"use strict";
/**
 * Created by LenovoZ510 on 2017. 03. 16..
 */
var ScoreHelper_1 = require("./ScoreHelper");
var Configuration = (function () {
    function Configuration() {
        this._isMobile = false;
        this._battery = { level: 0.5 };
        this._connection = { type: 'not supported' };
        this._os = {};
        this._device = {};
        this._downloadSpeed = 0; //Mbps
        this.downSpeedRangeLimit = 25; //Mbps
    }
    Configuration.prototype.getBattery = function () {
        return this._battery;
    };
    Configuration.prototype.getIsMobile = function () {
        return this._isMobile;
    };
    Configuration.prototype.setIsMobile = function (isMobile) {
        this._isMobile = isMobile;
    };
    /*BatteryManager - navigator.battery return value*/
    Configuration.prototype.setBattery = function (batteryManager) {
        this._battery = batteryManager;
    };
    Configuration.prototype.getConnection = function () {
        return this._connection;
    };
    /*NetworkInformation - navigator.connection return value*/
    Configuration.prototype.setConnection = function (conn) {
        if (conn !== undefined && conn.type !== undefined) {
            this._connection.type = conn.type;
        }
    };
    Configuration.prototype.getOsInfo = function () {
        return this._os;
    };
    Configuration.prototype.setOsInfo = function (os) {
        this._os = os;
    };
    Configuration.prototype.getDevice = function () {
        return this._device;
    };
    Configuration.prototype.setDevice = function (device) {
        this._device = device;
    };
    Configuration.prototype.getDownloadSpeed = function () {
        return this._downloadSpeed;
    };
    Configuration.prototype.setDownloadSpeed = function (downSpeedInMbps) {
        this._downloadSpeed = downSpeedInMbps;
    };
    Configuration.prototype.getScore = function () {
        var score = 0;
        //these config parameters overwrites the score
        if (this._connection.type === 'cellular' || (this._battery.level < 0.15 && this._battery.charging === false))
            return score;
        score = ScoreHelper_1.ScoreHelper.batteryLevelCoeff * this._battery.level +
            ScoreHelper_1.ScoreHelper.batteryChargingCoeff * Number(this._battery.charging) +
            ScoreHelper_1.ScoreHelper.batteryDischargingTimeCoeff * (this._battery.dischargingTime === Infinity ? 1 : this._battery.dischargingTime);
        switch (this._connection.type) {
            case 'wifi':
                score += ScoreHelper_1.ScoreHelper.connectionTypeCoeff;
                break; //connectionTypeCoeff * 1
            case undefined:
                score += ScoreHelper_1.ScoreHelper.connectionTypeCoeff * .8;
                break; //desktop browsers doesn't support connection.type
            default: break;
        }
        var downSpeedScore = 0;
        if (this._downloadSpeed < this.downSpeedRangeLimit) {
            downSpeedScore = this._downloadSpeed / this.downSpeedRangeLimit;
        }
        else {
            downSpeedScore = 1;
        }
        score += ScoreHelper_1.ScoreHelper.downSpeedCoeff * downSpeedScore;
        score += ScoreHelper_1.ScoreHelper.memorySizeCoeff; //TODO: get device memory info from somewhere
        return score;
    };
    return Configuration;
}());
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map