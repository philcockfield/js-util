import React from "react";
import { expect } from "chai";
import { PropTypes } from "../../src/react";
import reactSchema from "react-schema";


describe("React PropTypes", function() {
  it("exports the `react-schema` PropTypes", () => {
    expect(PropTypes).to.equal(reactSchema.PropTypes);
  });
});
