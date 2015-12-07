import React from "react";
import { expect } from "chai";
import { PropTypes } from "../../src/react";
import reactSchema from "react-schema";


describe("React PropTypes", function() {
  it("has a validate method", () => {
    expect(reactSchema.validate).to.be.an.instanceof(Function);
  });

  it("exposes react prop-types", () => {
    Object.keys(React.PropTypes).forEach((key) => {
      expect(PropTypes[key]).to.be.an.instanceof(Function);
    });
  });
});
