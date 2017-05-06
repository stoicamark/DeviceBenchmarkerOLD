
import {expect} from "chai";
import {BenchMarker} from "../src/BenchMarker";
import {Configuration} from "../src/Configuration";

declare function describe(desc: string, callBack);
declare function it(desc: string, callBack);

describe("BenchMarker", ()=>{
    let benchMarker = new BenchMarker();

    it("should provide a score when configuration changes", ()=>{
        benchMarker.on((conf:Configuration)=>{
            expect(conf.getScore()).is.not.empty;
        });
    });

    it("dummy", () => {
        expect(true).is.not.empty;
    });
});