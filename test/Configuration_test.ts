/**
 * Created by LenovoZ510 on 2017. 05. 06..
 */

import {expect} from "chai";
import {BenchMarker} from "../src/BenchMarker";
import {UAParser} from "ua-parser-js";
import {Configuration} from "../src/Configuration";

declare function require(name:string);
let UAP = require("ua-parser-js");

declare function describe(desc: string, callBack);
declare function it(desc: string, callBack);
declare function before(callBack);
declare function beforeEach(callBack);

describe("Configuration", ()=>{

    let config: Configuration;
    let parser: UAParser;
    let result;

    before(()=>{
        parser = new UAP();
        parser.setUA(navigator.userAgent);
        result = parser.getResult();
    });

    beforeEach(()=>{
        config = new Configuration();
    });

    describe("wildcards should result zero score", ()=>{

        it("cellular data usage results zero score", ()=>{
            config.setConnection({type: "cellular"});
            let score = config.getScore();
            expect(score).to.equal(0);
        });

        it("battery level under 15% and discharging results zero score", ()=>{
            config.setBattery({level: 0.05, charging: false});
            let score = config.getScore();
            expect(score).to.equal(0);
        });
    });

});