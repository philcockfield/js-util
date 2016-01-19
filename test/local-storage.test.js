import R from "ramda";
import { expect } from "chai";
import localStorage from "../src/local-storage";


describe("LocalStorage", () => {
  describe("nothing", () => {
    it("undefined", () => {
      const KEY = "undefined-key";
      expect(localStorage.prop(KEY)).to.equal(undefined);
    });


    it("reset with null", () => {
      const KEY = "null-key";
      expect(localStorage.prop(KEY, undefined, { default:null })).to.equal(null);
      localStorage.prop(KEY, "VALUE");
      localStorage.prop(KEY, null);
      expect(localStorage.prop(KEY)).to.equal(undefined);
    });
  });


  it("returns keys", () => {
    const KEY = 'return-keys-test';
    let keys;
    keys = localStorage.keys();
    expect(R.any(item => KEY, keys)).to.equal(false);

    localStorage.prop(KEY, 123);
    keys = localStorage.keys();
    expect(R.any(item => KEY, keys)).to.equal(true);
  });


  describe("data-types", () => {
    it("string", () => {
      const KEY = "string-key";
      expect(localStorage.prop(KEY, undefined, { default:"foo" })).to.equal("foo");
      localStorage.prop(KEY, "my-String");
      expect(localStorage.prop(KEY)).to.equal("my-String");
    });

    it("bool", () => {
      const KEY = "bool-key";
      expect(localStorage.prop(KEY, undefined, { default:false })).to.equal(false);
      localStorage.prop(KEY, true);
      expect(localStorage.prop(KEY)).to.equal(true);
    });

    it("number", () => {
      const KEY = "number-key";
      expect(localStorage.prop(KEY, undefined, { default:123 })).to.equal(123);
      localStorage.prop(KEY, 5.5);
      expect(localStorage.prop(KEY)).to.equal(5.5);
    });

    it("date", () => {
      const KEY = "date-key";
      const now = new Date();
      expect(localStorage.prop(KEY, undefined, { default:now })).to.equal(now);
      localStorage.prop(KEY, now);
      expect(localStorage.prop(KEY)).to.eql(now);
    });

    it("object", () => {
      const KEY = "object-key";
      const now = new Date();
      expect(localStorage.prop(KEY, undefined, { default:{ foo: 123 } })).to.eql({ foo: 123 });
      localStorage.prop(KEY, { foo:{ bar:123 } });
      expect(localStorage.prop(KEY)).to.eql({ foo:{ bar:123 } });
    });
  });
});
