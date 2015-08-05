import _ from "lodash";
import { expect } from "chai";
import { css } from "../../src/react";
import * as color from "../../src/color";


describe("React: CSS - color", () => {
  it("copies color methods on the [css] function", () => {
    _.keys(color).forEach(key => {
      expect(css[key]).to.exist;
    });
  });

  describe("named colors", () => {
    it("exposes [white]", () => {
      expect(css.white.name).to.equal("white");
    });

    it("exposes [black]", () => {
      expect(css.black.name).to.equal("black");
    });

    it("converts to string", () => {
      expect(css.color("white").toString()).to.equal("#FFFFFF");
    });

    it("darkens", () => {
      expect(css.color("white").darken(0.3)).to.equal("#B3B3B3");
    });

  });

});
