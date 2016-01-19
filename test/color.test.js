import { expect } from "chai";
import * as color from "../src/color";



describe("color", () => {
  describe(".fromAlpha", () => {
    it("returns the given string (no-op)", () => {
      expect(color.fromAlpha("rgba(0,0,0,0.3")).to.equal("rgba(0,0,0,0.3");
    });

    it("returns the given null/undefined value (no-op)", () => {
      expect(color.fromAlpha()).to.equal(undefined);
      expect(color.fromAlpha(null)).to.equal(null);
    });

    it("returns 'transparent' (0)", () => {
      expect(color.fromAlpha(0)).to.equal("transparent");
    });


    describe("black (-1..0)", () => {
      it("returns pure black", () => {
        expect(color.fromAlpha(-1)).to.equal("rgba(0, 0, 0, 1)");
        expect(color.fromAlpha(-2)).to.equal("rgba(0, 0, 0, 1)");
      });

      it("returns percentage of black", () => {
        expect(color.fromAlpha(-0.3)).to.equal("rgba(0, 0, 0, 0.3)");
        expect(color.fromAlpha(-0.3)).to.equal("rgba(0, 0, 0, 0.3)");
      });
    });


    describe("white (0..1)", () => {
      it("returns pure white", () => {
        expect(color.fromAlpha(1)).to.equal("rgba(255, 255, 255, 1)");
        expect(color.fromAlpha(2)).to.equal("rgba(255, 255, 255, 1)");
      });

      it("returns percentage of white", () => {
        expect(color.fromAlpha(0.3)).to.equal("rgba(255, 255, 255, 0.3)");
        expect(color.fromAlpha(0.3)).to.equal("rgba(255, 255, 255, 0.3)");
      });
    });
  });
});
