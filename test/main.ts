import {BenchMarker, BenchMarkerHandler} from "../src/BenchMarker";
import {Configuration} from "../src/Model";

declare let navigator : {
    connection:{ type : string};
};

class MyBenchMarkerHandler implements BenchMarkerHandler{

    onConnectionTypeChanged(conf: Configuration): void {
        let connection = conf.getConnection();
        document.querySelector('#connection').innerHTML = "<ul><li>type: " +
            connection.type + "</li><li>downlinkMax: " +
            String(connection.downlinkMax) + " Mbps</li></ul>";
    }

    onBatteryStatusChanged(config : Configuration){
        console.log(config);
        let battery = config.getBattery();
        document.querySelector('#b_ischarging').textContent = (battery.charging ? 'charging' : 'not charging');
        document.querySelector('#b_level').textContent = (Math.round(battery.level * 10000) / 100) + '%';
        if (!battery.charging) {
            document.querySelector('#b_discharging_time').textContent = 'Time remaining: ' + (battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h');
        } else {
            document.querySelector('#b_discharging_time').textContent = 'Charging Time: ' + (battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h');
        }
    }
}

let test = function(){
    BenchMarker.create(new MyBenchMarkerHandler());

    //document.querySelector('#isMobile').textContent = benchMarker.isMobile();
/*
    let usrAgent = window.navigator.userAgent;
    usrAgent = usrAgent.match(/\((.*?)\)/g)[0];

    let deviceInfo = usrAgent.split(';')[2];
    deviceInfo = deviceInfo.substr(0, deviceInfo.length-1);

    let osInfo = usrAgent.split(';')[1];

    document.querySelector('#deviceInfo').textContent = deviceInfo;
    document.querySelector('#osInfo').textContent = osInfo;*/

    document.querySelector('#connectionType').textContent = navigator.connection.type;

};

test();

