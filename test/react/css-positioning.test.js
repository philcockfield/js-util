import { expect } from "chai";
import { css } from "../../src/react";
import { formatPositionEdges } from "../../src/react/css";


describe("React: CSS - positioning", () => {
  describe("absolute", () => {

    it("converts all edge values to object", () => {
      const style = { Absolute: "10 20 30em 40" };
      let result = formatPositionEdges("Absolute", style);
      console.log("result", result);
    });

  });
});
