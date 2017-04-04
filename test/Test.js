"use strict";
var BenchMarker_1 = require("../src/BenchMarker");
(function () {
    var devMarker = (new BenchMarker_1.BenchMarker()).on(function (config) {
        printConfigurationDetails(config);
        console.log(config);
    });
    var printConfigurationDetails = function (config) {
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
})();
//# sourceMappingURL=Test.js.map