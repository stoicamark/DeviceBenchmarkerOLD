"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const BenchMarker_1 = require("../src/BenchMarker");
let printConfigurationDetails = (config) => {
    document.querySelector("#configDetails").innerHTML =
        "<tr><th>param</th><th>value</th></tr>" +
            "<tr><td>score: </td><td>" + config.getScore() + "</td></tr>" +
            "<tr><td>download speed: </td><td>" + config.getDownloadSpeed() + "</td></tr>" +
            "<tr><td>connection type: </td><td>" + config.getConnection().type + "</td></tr>" +
            "<tr><td>battery level: </td><td>" + config.getBattery().level + "</td></tr>" +
            "<tr><td>charging: </td><td>" + config.getBattery().charging + "</td></tr>" +
            "<tr><td>charging time: </td><td>" + config.getBattery().chargingTime + "</td></tr>" +
            "<tr><td>discharging time: </td><td>" + config.getBattery().dischargingTime + "</td></tr>" +
            "<tr><td>device model: </td><td>" + config.getDevice().model + "</td></tr>" +
            "<tr><td>device vendor: </td><td>" + config.getDevice().vendor + "</td></tr>" +
            "<tr><td>device type: </td><td>" + config.getDevice().type + "</td></tr>" +
            "<tr><td>os name: </td><td>" + config.getOsInfo().name + "</td></tr>" +
            "<tr><td>os version: </td><td>" + config.getOsInfo().version + "</td></tr>" +
            "<tr><td>is mobile: </td><td>" + config.getIsMobile() + "</td></tr>";
};
let test1 = () => {
    let devMarker = new BenchMarker_1.BenchMarker();
    devMarker.on(function (config) {
        printConfigurationDetails(config);
        devMarker.allOff();
    });
};
let test2 = () => __awaiter(this, void 0, void 0, function* () {
    let devMarker = new BenchMarker_1.BenchMarker();
    let config = yield devMarker.getascore();
    printConfigurationDetails(config);
});
//test1();
test2();
//# sourceMappingURL=Test.js.map