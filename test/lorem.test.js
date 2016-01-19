import { expect } from "chai";
import lorem, { LOREM } from "../src/lorem";


describe("lorem", function() {
  it("returns the full text", () => {
    expect(lorem()).to.equal(LOREM);
  });

  it("returns a single word", () => {
    expect(lorem(1)).to.equal("Lorem");
  });

  it("returns two words", () => {
    expect(lorem(2)).to.equal("Lorem ipsum");
  });

  it("returns more more than the standard set of words", () => {
    const words = LOREM.split(" ");
    const total = words.length + 30;
    expect(lorem(total).split(" ").length).to.equal(total);
  });
});
