import {Configuration} from "../src/Configuration";

declare function require(arg: string);
var fs = require('fs');

/**
 * Created by LenovoZ510 on 2017. 05. 16..
 */

let gen = ()=>{

    let config = new Configuration();
    let csvData: string = ";score @ 5Mbps;score @ 15Mbps;score @ 25Mbps" + "\n";

    let batteryLevelValues = [0.05, 0.15, 0.30, 0.50, 0.75, 0.90, 1.00];
    let dischargingTimeValues = [900, 7200, 14400, 25200]; //15min, 2hours, 4hours, 7hours
    let downSpeedValues = [5, 15, 25];

    config.setConnection({type:"wifi"});

    let battery = {level: 0, charging:true, dischargingTime:Infinity};

    batteryLevelValues.map(bLevel => {

        battery.level = bLevel;
        config.setBattery(battery);
        csvData += bLevel + ";";

        downSpeedValues.map(dSpeed => {
            config.setDownloadSpeed(dSpeed);
            csvData += config.getScore().toFixed(4) + ";";
        });
        csvData += "\n";
    });

    fs.writeFile("./test.csv", csvData, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

    console.log(config.getDownloadSpeed());
    csvData = ";score @ 15min disch. time;score @ 2hours disch. time;score @ 4hours disch. time; score @ 7hours disch. time" + "\n";
    battery = {level: 0, charging:false, dischargingTime:0};

    batteryLevelValues.map(bLevel => {

        battery.level = bLevel;
        csvData += bLevel + ";";

        dischargingTimeValues.map(dTime => {
            battery.dischargingTime = dTime;
            config.setBattery(battery);
            csvData += config.getScore().toFixed(4) + ";";
        });
        csvData += "\n";
    });

    fs.writeFile("./test2.csv", csvData, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file2 was saved!");
    });
};

gen();