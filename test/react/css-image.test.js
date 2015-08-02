import { expect } from "chai";
import { css } from "../../src/react";
import { image, expandImagePath } from "../../src/react/css";


describe("React:css:image", () => {
  describe("path extraction (expandImagePath)", () => {
    it("[png] with path", () => {
      const result = expandImagePath("../foo/bar.png")
      expect(result.basePath).to.equal("../foo/");
      expect(result.fileName).to.equal("bar");
      expect(result.extension).to.equal("png");
      expect(result["1x"]).to.equal("../foo/bar.png");
      expect(result["2x"]).to.equal("../foo/bar@2x.png");
    });

    it("[png] with no path", () => {
      const result = expandImagePath("bar.png")
      expect(result.basePath).to.equal("");
      expect(result.fileName).to.equal("bar");
      expect(result.extension).to.equal("png");
      expect(result["1x"]).to.equal("bar.png");
      expect(result["2x"]).to.equal("bar@2x.png");
    });

    it("throws if no image is specified", () => {
      expect(() => { expandImage(); }).to.throw();
      expect(() => { expandImage(null); }).to.throw();
      expect(() => { expandImage(""); }).to.throw();
    });

    it("throws if there is no file extension", () => {
      expect(() => { expandImage("../foo/bar"); }).to.throw();
    });
  });


  describe("image()", () => {
    afterEach(() => {
      delete global.devicePixelRatio;
    });

    it("is attached to the [css] function as a property", () => {
      expect(css.image).to.equal(image);
    });

    it("returns the 1x resolution", () => {
      global.devicePixelRatio = 1;
      const result = image("1x", "2x");
      expect(result.backgroundImage).to.equal("url(1x)");
    });

    it("returns the 1x resolution", () => {
      global.devicePixelRatio = 2;
      const result = image("1x", "2x");
      expect(result.backgroundImage).to.equal("url(2x)");
    });

    it("has width and height values (defaults)", () => {
      const result = image("1x", "2x");
      expect(result.width).to.equal(10);
      expect(result.height).to.equal(10);
    });

    it("has width and height values (specified)", () => {
      const result = image("1x", "2x", { width:20, height:150 });
      expect(result.width).to.equal(20);
      expect(result.height).to.equal(150);
    });

    it("has [backgroundSize]", () => {
      const result = image("1x", "2x", { width:20, height:150 });
      expect(result.backgroundSize).to.equal("20px 150px");
    });

    it("does not repeat the background", () => {
      const result = image("1x", "2x", { width:20, height:150 });
      expect(result.backgroundRepeat).to.equal("no-repeat");
    });

    it("replaces 'Image' with style settings (1x)", () => {
      global.devicePixelRatio = 1;
      const style = { Image:["1x", "2x", 20, 30] };
      const result = css(style);
      expect(result.Image).to.equal(undefined);
      expect(result.backgroundImage).to.equal("url(1x)");
      expect(result.width).to.equal(20);
      expect(result.height).to.equal(30);
      expect(result.backgroundSize).to.equal("20px 30px");
      expect(result.backgroundRepeat).to.equal("no-repeat");
    });
  });
});
