import { expect } from "chai";
import PropTypes from "../src/PropTypes";



describe.only("React", () => {
  describe("PropTypes.oneOf", () => {
    it("stores enum values on return object", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.oneOf).to.eql(['one', 'two']);
    });

    it("stores enum values on the corresponding `isRequired` object", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.isRequired.oneOf).to.eql(['one', 'two']);
    });
  });


  describe("PropTypes.shape", () => {
    it("stores the shape on the return object", () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.shape).to.eql({ isEnabled: PropTypes.bool });
    });

    it("stores the shape on the corresponding `isRequired` object", () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.isRequired.shape).to.eql({ isEnabled: PropTypes.bool });
    });
  });
});
