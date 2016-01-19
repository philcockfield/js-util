import { expect } from "chai";
import css, { toPositionEdges, formatPositionEdges } from "../src/react-css";


describe("React: CSS - positioning", () => {
  describe("converting from css() function", () => {
    it("converts an 'Absolute' value (deep)", () => {
      const style = css({ base: { Absolute: "10 20em 30px 40" }});
      expect(style.base.position).to.equal("absolute");
      expect(style.base.top).to.equal(10);
      expect(style.base.right).to.equal("20em");
      expect(style.base.bottom).to.equal("30px");
      expect(style.base.left).to.equal(40);
    });


    it("converts a 'Fixed' value", () => {
      const style = css({ Fixed: "10 20em 30px 40" });
      expect(style.position).to.equal("fixed");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal("20em");
      expect(style.bottom).to.equal("30px");
      expect(style.left).to.equal(40);
    });


    it("converts array value (with null's)", () => {
      const style = css({ Absolute: ["10", null, "30px", "40"] });
      expect(style.position).to.equal("absolute");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal(undefined);
      expect(style.bottom).to.equal("30px");
      expect(style.left).to.equal(40);
    });

    it("does nothing with an [undefined] value", () => {
      expect(css({ base: { Absolute:undefined }})).to.eql({ base:{} });
    });

    it("does nothing with an [empty-string] value", () => {
      expect(css({ base: { Absolute:"" }})).to.eql({ base:{} });
    });
  });


  describe("toPositionEdges", () => {
    it("all edges from string", () => {
      const style = toPositionEdges("Absolute", "10 20 30em 40");
      expect(style.position).to.equal("absolute");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal(20);
      expect(style.bottom).to.equal("30em");
      expect(style.left).to.equal(40);
    });

    it("string containing `null`", () => {
      const style = toPositionEdges("Absolute", "10 null 30em null");
      expect(style.top).to.equal(10);
      expect(style.right).to.equal(undefined);
      expect(style.bottom).to.equal("30em");
      expect(style.left).to.equal(undefined);
    });


    describe("array", () => {
      it("all edges", () => {
        const style = toPositionEdges("Absolute", ["10", "20", "30em", "40"]);
        expect(style.top).to.equal(10);
        expect(style.right).to.equal(20);
        expect(style.bottom).to.equal("30em");
        expect(style.left).to.equal(40);
      });

      it("all edges (0)", () => {
        const style = toPositionEdges("Absolute", [0, 0, 0, 0]);
        expect(style.top).to.equal(0);
        expect(style.right).to.equal(0);
        expect(style.bottom).to.equal(0);
        expect(style.left).to.equal(0);
      });

      it("empty array", () => {
        const style = toPositionEdges("Absolute", []);
        expect(style).to.equal(undefined);
      });

      it("single value array [0]", () => {
        const style = toPositionEdges("Absolute", [0]);
        expect(style.top).to.equal(0);
        expect(style.right).to.equal(0);
        expect(style.bottom).to.equal(0);
        expect(style.left).to.equal(0);
      });

      it("array containing `null` values", () => {
        const style = toPositionEdges("Absolute", [null, 10, null, null]);
        expect(style.top).to.equal(undefined);
        expect(style.right).to.equal(10);
        expect(style.bottom).to.equal(undefined);
        expect(style.left).to.equal(undefined);
      });

      it("array containing all `null` values", () => {
        const style = toPositionEdges("Absolute", [null, null, null, null]);
        expect(style).to.equal(undefined);
      });
    });

    describe("shorthand", () => {
      it("empty-string", () => {
        const style = toPositionEdges("Absolute", "");
        expect(style).to.equal(undefined);
      });

      it("undefined", () => {
        const style = toPositionEdges("Absolute");
        expect(style).to.equal(undefined);
      });

      it("1-value", () => {
        const style = toPositionEdges("Absolute", "10");
        expect(style.top).to.equal(10);
        expect(style.right).to.equal(10);
        expect(style.bottom).to.equal(10);
        expect(style.left).to.equal(10);
      });

      it("1-value / Number", () => {
        const style = toPositionEdges("Absolute", 10);
        expect(style.top).to.equal(10);
        expect(style.right).to.equal(10);
        expect(style.bottom).to.equal(10);
        expect(style.left).to.equal(10);
      });

      it("2-values", () => {
        const style = toPositionEdges("Absolute", "10 30em");
        expect(style.top).to.equal(10);
        expect(style.right).to.equal("30em");
        expect(style.bottom).to.equal(10);
        expect(style.left).to.equal("30em");
      });

      it("3-values", () => {
        const style = toPositionEdges("Absolute", "10 30em 40");
        expect(style.top).to.equal(10);
        expect(style.right).to.equal("30em");
        expect(style.left).to.equal("30em");
        expect(style.bottom).to.equal(40);
      });
    });
  });
});
