import { expect } from "chai";
import * as util from "../src";


describe("util.delay", () => {
  it("delays", (done) => {
    let isFinished = false;
    util.delay(5, () => { isFinished = true });
    let fn = () => {
        expect(isFinished).to.equal(true);
        done()
      };
    setTimeout(fn, 10)
  });


  it("does not fail when no function is specified", (done) => {
    util.delay(100);
    util.delay(5, () => { done() });
  });


  it("invokes immediately when no time value is specified", (done) => {
    util.delay(() => { done() });
  });


  it("stops the timer", (done) => {
    let isFinished = false;
    let result = util.delay(5, () => { isFinished = true });
    result.stop();
    util.delay(10, () => {
        expect(isFinished).to.equal(false);
        done()
      });
  });
});
