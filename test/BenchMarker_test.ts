
import {expect} from "chai";
import {BenchMarker} from "../src/BenchMarker";
import {Configuration} from "../src/Configuration";
import {Promise} from "es6-promise";

declare function describe(desc: string, callBack);
declare function it(desc: string, callBack);
declare function beforeEach(callBack);
declare function afterEach(callBack);

describe("BenchMarker", ()=>{
    var benchMarker;

    beforeEach(()=>{
       benchMarker = new BenchMarker();
    });

    afterEach(()=>{
        if(benchMarker.hasListener())
            benchMarker.allOff();
    });

    it("should provide a score when configuration changes", ()=>{
        let val =navigator['getBattery'];
        navigator['getBattery'] = ()=>{return new Promise<any>((resolve, reject)=>{resolve({})});};
        benchMarker.on((conf:Configuration) => {
            let score = conf.getScore();
            expect(score).to.be.undefined;
        });
        navigator['getBattery'].onchargingchange();

        navigator['getBattery'] = val;
    });

    it("the provided score must be above 0 and below 1", ()=>{
        benchMarker.on((conf:Configuration) => {
            let score = conf.getScore();
            expect(score).to.be.above(0);
            expect(score).to.be.below(1);
        });
    });
});