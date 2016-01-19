import R from "ramda";
import { expect } from "chai";
import * as util from "../src";
import Handlers from "../src/Handlers";


describe("Handlers", () => {
  describe("Handlers (Init)", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers(); });

    it("constructs with no context or handlers", () => {
      expect(handlers.count()).to.equal(0);
      expect(handlers.context).to.equal(undefined);
    });

    it("flattens handlers within constructor", () => {
      let func1 = () => 0;
      let func2 = () => 0;
      let func3 = () => 0;
      let handlers = new Handlers(this, func1, [func2, func3])
      expect(handlers.count()).to.equal(3);
    });

    it("is disposable", () => {
      handlers.push(() => 0);
      expect(handlers.items.length).to.equal(1);
      handlers.dispose();
      expect(handlers.items.length).to.equal(0);
      expect(handlers.isDisposed).to.equal(true);
    });
  });

  describe("Handlers.add", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("adds a handler to the array", () => {
      let fn = () => 0;
      handlers.add(fn);
      let isContained = R.any(item => item.func === fn, handlers.items);
      expect(isContained).to.equal(true);
    });


    it("does not add a non-function to the array", () => {
      handlers.add(123);
      let isContained = R.any(item => item.func === fn, handlers.items);
      expect(isContained).to.equal(false);
    });


    it("returns a handle", () => {
      let fn1 = () => 0;
      let fn2 = () => 0;
      let result1 = handlers.add(fn1);
      let result2 = handlers.add(fn2);
      expect(result1.func).to.equal(fn1);
      expect(result2.func).to.equal(fn2);
    });


    it("uses 'push' as an alias to 'add'", () => {
      let fn = () => 0;
      handlers.push(fn);
      let isContained = R.any(item => item.func === fn, handlers.items);
      expect(isContained).to.equal(true);
    });
  });


  describe("Handlers.remove", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("removes a handler from the array", () => {
      let fn = () => 0;
      handlers.add(fn);
      let wasRemoved = handlers.remove(fn);
      let isContained = R.any(item => item.func === fn, handlers.items);
      expect(isContained).to.equal(false);
      expect(wasRemoved).to.equal(true);
      expect(handlers.items).to.eql([]);
    });

    it("does not remove a handler that did not exist", () => {
      handlers.add(() => 0);
      let wasRemoved = handlers.remove(() => 0);
      expect(wasRemoved).to.equal(false);
    });

    it("removes the handle via the [stop] method", () => {
      let fn = () => 0;
      let handle = handlers.add(fn);
      expect(handlers.contains(fn)).to.equal(true);
      handle.stop();
      expect(handlers.contains(fn)).to.equal(false);
    });

    it("removes all handles on [dispose]", () => {
      handlers.add(() => 0);
      handlers.add(() => 0);
      handlers.add(() => 0);
      expect(handlers.items.length).to.equal(3);
      handlers.dispose();
      expect(handlers.items.length).to.equal(0);
    });
  });



  describe("Handlers.clear", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("removes all handlers", () => {
      handlers.add(() => 0);
      handlers.add(() => 0);
      handlers.add(() => 0);
      expect(handlers.items.length).to.equal(3);
      handlers.clear();
      expect(handlers.items.length).to.equal(0);
    });
  });


  describe("Handlers.invoke", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("invokes handlers returning true", () => {
      let count = 0;
      let fn1 = () => { count += 1 };
      let fn2 = () => { count += 1 };
      handlers.add(fn1);
      handlers.add(fn2);
      let result = handlers.invoke();
      expect(result).to.equal(true);
      expect(count).to.equal(2);
    });

    it("invokes handlers returning false (cancelled)", () => {
      let fn1 = () => true;
      let fn2 = () => false ;
      handlers.add(fn1);
      handlers.add(fn2);
      let result = handlers.invoke();
      expect(result).to.equal(false);
    });

    it("invokes handlers within a context", () => {
      let obj = {};
      let context = null;
      let handlers = new Handlers(obj);
      handlers.add(function() { context = this });
      handlers.invoke();
      expect(context).to.equal(obj);
    });

    it("invokes handlers with arguments", () => {
      let param1 = null;
      let param2 = null;
      handlers.add((p1, p2) => {
        param1 = p1;
        param2 = p2;
      });
      handlers.invoke(123, "abc");
      expect(param1).to.equal(123);
      expect(param2).to.equal("abc");
    });

    it("returns true when invoking with no handlers", () => {
      let handlers = new Handlers();
      let result = handlers.invoke();
      expect(result).to.equal(true);
    });
  });

  describe("Handlers.invokeAsync", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("invokeAsync returns true when there are no handlers", (done) => {
      handlers.invokeAsync((result, err) => {
          expect(result).to.equal(true);
          expect(err).to.equal(undefined);
          done();
        });
    });


    it("invokes handlers returning true", (done) => {
      let count = 0;
      handlers.add((done) => {
          count += 1;
          done();
        });
      handlers.add((done) => {
          count += 1;
          util.delay(() => { done() });
        });

      handlers.invokeAsync((result, err) => {
        expect(count).to.equal(2);
        expect(result).to.equal(true);
        done();
      });
    });


    it("invokes handlers returning false (cancelled)", (done) => {
      let finalHandlerSkipped = true;
      handlers.add((done) => { done(); });
      handlers.add((done) => { done(false); });
      handlers.add((done) => { finalHandlerSkipped = false; });
      handlers.invokeAsync((result, err) => {
        expect(result).to.equal(false);
        expect(finalHandlerSkipped).to.equal(true);
        done();
      });
    });


    it("invokes handlers with arguments", (done) => {
      let handlers = new Handlers();
      let obj = {};
      let context = null;

      let param1 = null;
      let param2 = null;
      handlers.add((p1, p2) => {
          expect(p1).to.equal(123);
          expect(p2).to.equal("abc");
          done();
        });
      handlers.invokeAsync(123, "abc", (result) => {});
    });

    it("returns true when invoking with no handlers", (done) => {
      let handlers = new Handlers();
      handlers.invokeAsync((result) => {
          expect(result).to.equal(true);
          done();
        });
    });
  });


  describe("Handlers.results", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("returns an empty array", () => {
      expect(handlers.results()).to.eql([]);
    });


    it("returns an array of values", () => {
      let count = 0;
      let fn = () => 0;
      let fn1 = () => null;
      let fn2 = () => undefined;
      let fn3 = () => "";
      let fn4 = () => false;
      let fn5 = () => fn;

      handlers.push(fn1);
      handlers.push(fn2);
      handlers.push(fn3);
      handlers.push(fn4);
      handlers.push(fn5);
      let results = handlers.results();
      expect(results.length).to.equal(5);
      expect(results[0]).to.equal(null);
      expect(results[1]).to.equal(undefined);
      expect(results[2]).to.equal("");
      expect(results[3]).to.equal(false);
      expect(results[4]).to.equal(fn);
    });
  });


  describe("Handlers.firstResult", () => {
    let handlers = null;
    beforeEach(() => { handlers = new Handlers() });

    it("returns no value", () => {
      let count = 0;
      let fn1 = () => {
          count += 1;
          null
        };
      let fn2 = () => {
          count += 1;
          undefined
        };

      handlers.push(fn1);
      handlers.push(fn2);
      let result = handlers.firstResult();
      expect(result).to.equal(undefined);
      expect(count).to.equal(2);
    });

    it("returns the first handler value", () => {
      let fn1 = () => "one";
      let fn2 = () => 0;
      handlers.push(fn1);
      handlers.push(fn2);
      expect(handlers.firstResult()).to.equal("one");
    });

    it("returns the second handler value", () => {
      let fn1 = () => { return; };
      let fn2 = () => { return; };
      let fn3 = () => { return "three" };
      handlers.push(fn1);
      handlers.push(fn2);
      handlers.push(fn3);
      expect(handlers.firstResult()).to.equal("three");
    });
  });
});
