import { expect } from "chai";
import css from "../src/react-css";


describe("React: CSS", () => {
  it("is a function", () => {
    expect(css).to.be.an.instanceof(Function);
  });

  it("returns the given object", () => {
    const style = { color: "red" };
    expect(css(style)).to.equal(style);
  });

  it("returns an empty object if no `style` parameter is given", () => {
    expect(css()).to.eql({});
  });

  it("removes undefined values", () => {
    const style = { color: undefined, background: null };
    expect(css(style)).to.eql({});
  });

  it("processes an object deeply", () => {
    const style = {
      nothing: undefined,
      base: {
        background: 'red',
        color: undefined,
        foo: {
          background: null,
          color: 'green'
        }
      }
    };
    expect(css(style)).to.eql({
      base: {
        background: 'red',
        foo: {
          color: 'green'
        }
      }
    });
  });
});
