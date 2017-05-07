
import {expect} from "chai";
import {BenchMarker} from "../src/BenchMarker";
import {Configuration} from "../src/Configuration";

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
        benchMarker.on((conf:Configuration) => {
            let score = conf.getScore();
            expect(score).to.be.undefined;
        });
    });

    it("the provided score must be above 0 and below 1", ()=>{
        benchMarker.on((conf:Configuration) => {
            let score = conf.getScore();
            expect(score).to.be.above(0);
            expect(score).to.be.below(1);
        });
    });
});