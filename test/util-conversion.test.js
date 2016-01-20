import { expect } from "chai";
import * as util from "../src";



describe("util.isBlank", () => {
  describe("blank", () => {
    it("is blank (nothing)", () => {
      expect(util.isBlank()).to.equal(true);
      expect(util.isBlank(undefined)).to.equal(true);
      expect(util.isBlank(null)).to.equal(true);
    });

    it("is blank (string)", () => {
      expect(util.isBlank("")).to.equal(true);
      expect(util.isBlank(" ")).to.equal(true);
      expect(util.isBlank("   ")).to.equal(true);
    });

    it("is blank (array)", () => {
      expect(util.isBlank([])).to.equal(true);
      expect(util.isBlank([null])).to.equal(true);
      expect(util.isBlank([undefined])).to.equal(true);
      expect(util.isBlank([undefined, null])).to.equal(true);
      expect(util.isBlank([undefined, null, ""])).to.equal(true);
    });
  });

  describe("NOT blank", () => {
    it("is not blank (string)", () => {
      expect(util.isBlank("a")).to.equal(false);
      expect(util.isBlank("   .")).to.equal(false);
    });

    it("is not blank (array)", () => {
      expect(util.isBlank([1])).to.equal(false);
      expect(util.isBlank([null, "value"])).to.equal(false);
      expect(util.isBlank([null, "   "])).to.equal(false);
    });

    it("is not blank (other values)", () => {
      expect(util.isBlank(1)).to.equal(false);
      expect(util.isBlank({})).to.equal(false);
      expect(util.isBlank(() => 0)).to.equal(false);
    });
  });
});


// ----------------------------------------------------------------------------


describe("util.isNumeric", () => {
  it("is numeric (number)", () => {
    expect(util.isNumeric(0)).to.equal(true);
    expect(util.isNumeric(1)).to.equal(true);
    expect(util.isNumeric(-1)).to.equal(true);
    expect(util.isNumeric(0.5)).to.equal(true);
    expect(util.isNumeric(123456.123456)).to.equal(true);
  });

  it("is numeric (string)", () => {
    expect(util.isNumeric("0")).to.equal(true);
    expect(util.isNumeric("1")).to.equal(true);
    expect(util.isNumeric("-1")).to.equal(true);
    expect(util.isNumeric("0.5")).to.equal(true);
    expect(util.isNumeric("123456.123456")).to.equal(true);
  });

  it("is not numeric", () => {
    expect(util.isNumeric()).to.equal(false);
    expect(util.isNumeric(null)).to.equal(false);
    expect(util.isNumeric(undefined)).to.equal(false);
    expect(util.isNumeric("string")).to.equal(false);
    expect(util.isNumeric("123px")).to.equal(false);
    expect(util.isNumeric({})).to.equal(false);
    expect(util.isNumeric(new Date())).to.equal(false);
  });
});


// ----------------------------------------------------------------------------


describe("util.toNumber", () => {
  it("returns the non-number value", () => {
    const NOW = new Date();
    const OBJECT = { foo:123 };
    expect(util.toNumber("hello")).to.equal("hello");
    expect(util.toNumber(OBJECT)).to.equal(OBJECT);
    expect(util.toNumber(NOW)).to.equal(NOW);
    expect(util.toNumber(null)).to.equal(null);
    expect(util.toNumber(undefined)).to.equal(undefined);
  });

  it("converts a string to a number", () => {
    expect(util.toNumber("0")).to.equal(0);
    expect(util.toNumber("-1")).to.equal(-1);
    expect(util.toNumber("1")).to.equal(1);
    expect(util.toNumber("12.34")).to.equal(12.34);
  });

  it("does not convert a number/unit string toa number", () => {
    expect(util.toNumber("10px")).to.equal("10px");
  });
});


// ----------------------------------------------------------------------------


describe("util.toBool", () => {
  describe("existing Boolean value", () => {
    it("true (no change)", () => {
      expect(util.toBool(true)).to.equal(true);
    });

    it("false (no change)", () => {
      expect(util.toBool(false)).to.equal(false);
    });
  });

  describe("string to Boolean", () => {
    it("converts `true` (string) to true", () => {
      expect(util.toBool("true")).to.equal(true);
      expect(util.toBool("True")).to.equal(true);
      expect(util.toBool("   truE   ")).to.equal(true);
    });

    it("converts `false` (string) to false", () => {
      expect(util.toBool("false")).to.equal(false);
      expect(util.toBool("False")).to.equal(false);
      expect(util.toBool("   falSe   ")).to.equal(false);
    });
  });

  it("does not convert other value types", () => {
    expect(util.toBool()).to.equal(undefined);
    expect(util.toBool(null)).to.equal(undefined);
    expect(util.toBool("Foo")).to.equal(undefined);
    expect(util.toBool("")).to.equal(undefined);
    expect(util.toBool(" ")).to.equal(undefined);
    expect(util.toBool(123)).to.equal(undefined);
    expect(util.toBool({foo:123})).to.eql(undefined);
  });

  it("returns the given default value", () => {
    expect(util.toBool(undefined, true)).to.equal(true);
    expect(util.toBool(undefined, false)).to.equal(false);
    expect(util.toBool(undefined, 123)).to.equal(123);

    expect(util.toBool(null, true)).to.equal(true);
    expect(util.toBool(null, false)).to.equal(false);
    expect(util.toBool(null, 123)).to.equal(123);
  });
});



// ----------------------------------------------------------------------------


describe("toType", function() {
  it("converts to bool (true)", () => {
    expect(util.toType("true")).to.equal(true);
    expect(util.toType(" true  ")).to.equal(true);
    expect(util.toType("True")).to.equal(true);
    expect(util.toType("TRUE")).to.equal(true);
  });

  it("converts to bool (false)", () => {
    expect(util.toType("false")).to.equal(false);
    expect(util.toType(" false  ")).to.equal(false);
    expect(util.toType("False")).to.equal(false);
    expect(util.toType("FALSE")).to.equal(false);
  });

  it("converts to number", () => {
    expect(util.toType("123")).to.equal(123);
    expect(util.toType(" -123  ")).to.equal(-123);
    expect(util.toType("0")).to.equal(0);
    expect(util.toType("0.0001")).to.equal(0.0001);
  });

  it("converts does not convert", () => {
    const now = new Date();
    expect(util.toType("foo")).to.eql("foo");
    expect(util.toType()).to.eql();
    expect(util.toType(null)).to.eql(null);
    expect(util.toType({})).to.eql({});
    expect(util.toType(now)).to.eql(now);
    expect(util.toType(123)).to.eql(123);
  });
});
