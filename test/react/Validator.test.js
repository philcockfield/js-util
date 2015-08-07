import _ from "lodash";
import { expect } from "chai";
import React from "react";
import Validator from "../../src/react/Validator";
import { validate } from "../../src/react";
import { PropTypes } from "../../src/react";


describe("Validate PropTypes", () => {
  it("store propTypes on the validator", () => {
    const propTypes = { isEnabled: React.PropTypes.bool };
    expect(Validator(propTypes).propTypes).to.equal(propTypes);
  });

  it("store empty propTypes on the validator when nothing is passed", () => {
    expect(Validator().propTypes).to.eql({});
  });

  it("reports (optional) component name within error message", () => {
    let result = Validator({ isEnabled: React.PropTypes.bool }).validate({ isEnabled:123 }, "MyComponent");
    expect(result.errors.isEnabled.message).to.contain("MyComponent");
  });


  describe("null values", () => {
    it("reports nothing if properties are not declared", () => {
      expect(Validator({}).validate().isValid).to.equal(true);
    });

    it("reports nothing if propType is not declared", () => {
      expect(Validator({}).validate({ foo:123, bar:"abc" }).isValid).to.equal(true);
      expect(Validator().validate({ foo:123, bar:"abc" }).isValid).to.equal(true);
    });
  });


  describe("primitives (bool, string, number)", () => {
    const propTypes = {
      myBool: React.PropTypes.bool,
      myString: React.PropTypes.string,
      myNumber: React.PropTypes.number
    };

    describe("is valid", () => {
      it("on all properties", () => {
        const props = {
          myBool: true,
          myString: "Foo",
          myNumber: 123
        };
        let result = Validator(propTypes).validate(props);
        expect(result.isValid).to.equal(true);
      });

      it("when partial set of properties is passed", () => {
        let result = Validator(propTypes).validate({ myString:"Foo" });
        expect(result.isValid).to.equal(true);
      });

      it("when partial undefined properties values are passed", () => {
        let result = Validator(propTypes).validate({ myString:undefined, myNumber:undefined, myBool:undefined });
        expect(result.isValid).to.equal(true);
      });

      it("when partial null properties values are passed", () => {
        let result = Validator(propTypes).validate({ myString:null, myNumber:null, myBool:null });
        expect(result.isValid).to.equal(true);
      });
    });


    describe("is not valid", () => {
      it("when wrong type passed (bool)", () => {
        let result = Validator(propTypes).validate({ myBool:123 });
        expect(result.isValid).to.equal(false);
        expect(result.errors.myBool).to.exist;
      });

      it("when wrong type passed (string)", () => {
        let result = Validator(propTypes).validate({ myString:123 });
        expect(result.isValid).to.equal(false);
        expect(result.errors.myString).to.exist;
      });

      it("when wrong type passed (number)", () => {
        let result = Validator(propTypes).validate({ myNumber:"hello" });
        expect(result.isValid).to.equal(false);
        expect(result.errors.myNumber).to.exist;
      });

      it("when required value is passed", () => {
        let validator = Validator({ text: React.PropTypes.string.isRequired });
        expect(validator.validate().isValid).to.equal(false);
        expect(validator.validate({ foo:123 }).isValid).to.equal(false);
      });
    });
  });


  describe("Enum", () => {
    it("is valid", () => {
      let validator = Validator({ enum: React.PropTypes.oneOf(["one", "two"]) });
      let result = validator.validate({ enum:"one" });
      expect(result.isValid).to.equal(true);
    });

    it("is not valid (wrong value)", () => {
      let validator = Validator({ enum: React.PropTypes.oneOf(["one", "two"]) });
      let result = validator.validate({ enum:"four" });
      expect(result.isValid).to.equal(false);
    });

    it("is not valid (required)", () => {
      let validator = Validator({ enum: React.PropTypes.oneOf(["one", "two"]).isRequired });
      let result = validator.validate()
      expect(result.isValid).to.equal(false);
    });
  });

  describe("Shape (Object)", () => {
    it("is valid", () => {
     let  validator = Validator({ obj: React.PropTypes.shape({ foo: React.PropTypes.string }) });
      let result = validator.validate({ obj:{ foo:"hello" }});
      expect(result.isValid).to.equal(true);
    });

    it("is not valid (wrong value)", () => {
     let  validator = Validator({ obj: React.PropTypes.shape({ foo: React.PropTypes.string }) });
      let result = validator.validate({ obj:{ foo:123 } });
      expect(result.isValid).to.equal(false);
    });

    it("is not valid (required)", () => {
     let  validator = Validator({
        obj: React.PropTypes.shape({ foo: React.PropTypes.string.isRequired })
      });
      let result = validator.validate({ obj:{}});
      expect(result.isValid).to.equal(false);
    });
  });
});
