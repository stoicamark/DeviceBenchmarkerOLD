import {BenchMarker, BenchMarkerHandler} from "../src/BenchMarker";
import {Configuration} from "../src/Model";

class MyBenchMarkerHandler implements BenchMarkerHandler{

    onConnectionTypeChanged(config: Configuration){
        //$('#deviceScore').text(config.getScore());
        document.querySelector("#deviceScore").textContent = String(config.getScore());
        console.log(config);
    }

    onBatteryStatusChanged(config : Configuration){
        //$('#deviceScore').text(config.getScore());
        document.querySelector("#deviceScore").textContent = String(config.getScore());
        console.log(config);
    }
}

(function(){
    let devMarker = (new BenchMarker()).on(new MyBenchMarkerHandler());
})();


