import { expect } from "chai";
import { css } from "../../src/react";
import { toPositionEdges, formatPositionEdges } from "../../src/react/css";


describe("React: CSS - positioning", () => {
  describe("toPositionEdges", () => {
    it("converts all edge values to object", () => {
      const style = toPositionEdges("Absolute", "10 20 30em 40");
      expect(style.position).to.equal("absolute");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal(20);
      expect(style.bottom).to.equal("30em");
      expect(style.left).to.equal(40);
    });

    it("shorthand: (empty-string)", () => {
      const style = toPositionEdges("Absolute", "");
      expect(style.top).to.equal(0);
      expect(style.right).to.equal(0);
      expect(style.bottom).to.equal(0);
      expect(style.left).to.equal(0);
    });

    it("shorthand: (undefined)", () => {
      const style = toPositionEdges("Absolute");
      expect(style.top).to.equal(0);
      expect(style.right).to.equal(0);
      expect(style.bottom).to.equal(0);
      expect(style.left).to.equal(0);
    });

    it("shorthand: (1-value)", () => {
      const style = toPositionEdges("Absolute", "10");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal(10);
      expect(style.bottom).to.equal(10);
      expect(style.left).to.equal(10);
    });

    it("shorthand: (2-values)", () => {
      const style = toPositionEdges("Absolute", "10 30em");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal("30em");
      expect(style.bottom).to.equal(10);
      expect(style.left).to.equal("30em");
    });

    it("shorthand: (3-values)", () => {
      const style = toPositionEdges("Absolute", "10 30em 40");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal("30em");
      expect(style.left).to.equal("30em");
      expect(style.bottom).to.equal(40);
    });
  });


  it("converts an 'Absolute' value", () => {
    const style = css({ Absolute: "10 20em 30px 40" });
    expect(style.position).to.equal("absolute");
    expect(style.top).to.equal(10);
    expect(style.right).to.equal("20em");
    expect(style.bottom).to.equal("30px");
    expect(style.left).to.equal(40);
  });


  it("converts an 'Fixed' value", () => {
    const style = css({ Fixed: "10 20em 30px 40" });
    expect(style.position).to.equal("fixed");
    expect(style.top).to.equal(10);
    expect(style.right).to.equal("20em");
    expect(style.bottom).to.equal("30px");
    expect(style.left).to.equal(40);
  });
});
