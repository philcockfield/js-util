import { expect } from "chai";
import * as util from "../src";




describe("ns (namespace)", () => {
  it("creates a new object (on specified root object)", () => {
    let root = {};
    let foo = util.ns(root, "path.foo");
    expect(foo).to.be.an("object");
    expect(root.path.foo).to.exist;
  });

  it("creates a new object from namespace as array (on specified root object)", () => {
    let root = {};
    let foo = util.ns(root, ["path", "foo"]);
    expect(foo).to.be.an("object");
    expect(root.path.foo).to.exist;
  });

  it("uses a custom delimiter (/)", () => {
    let root = {};
    let bar = util.ns(root, "path/foo/bar", { delimiter:"/"});
    expect(bar).to.be.an("object");
    expect(root.path.foo.bar).to.exist;
  });


  it("retrieves the same object", () => {
    let root = {};
    let foo1 = util.ns(root, "path.foo");
    let foo2 = util.ns(root, "path.foo");
    expect(foo1).to.equal(foo2);
  });

  it("returns different objects from different roots", () => {
    let root1 = {};
    let root2 = {};
    let foo1 = util.ns(root1, "path.foo");
    let foo2 = util.ns(root2, "path.foo");
    expect(foo1).not.to.equal(foo2);
  });

  it("returns a single level path", () => {
    let root = {};
    let foo = util.ns(root, "foo");
    expect(root.foo).to.exist;
  });

  it("returns nothing", () => {
    let root = {};
    expect(util.ns()).not.to.exist;
    expect(util.ns(root)).not.to.exist;
    expect(util.ns(root, null)).not.to.exist;
    expect(util.ns(root, "")).not.to.exist;
    expect(util.ns(root, "  ")).not.to.exist;
  });
});


// ----------------------------------------------------------------------------


describe("util.functionParameters", () => {
  it("has no params", () => {
    expect(util.functionParameters(() => 0)).to.eql([]);
  });

  it("has two params", () => {
    let fn = (one, two) => 0;
    expect(util.functionParameters(fn)).to.eql(["one", "two"]);
  });


  it("returns an empty array for (args...)", () => {
    let fn = (...args) => 0;
    expect(util.functionParameters(fn)).to.eql([]);
  });


  it("returns an empty array when a string is passed", () => {
    expect(util.functionParameters("foo")).to.eql([]);
  });


  it("returns an empty array when a object is passed", () => {
    expect(util.functionParameters({})).to.eql([]);
  });
});
