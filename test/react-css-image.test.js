import { expect } from "chai";
import css, { image, expandImagePath } from "../src/react-css";


describe("React: CSS - image", () => {
  describe("expandImagePath()", () => {
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
      expect(() => { expandImagePath(); }).to.throw();
      expect(() => { expandImagePath(null); }).to.throw();
      expect(() => { expandImagePath(""); }).to.throw();
    });

    it("throws if there is no file extension", () => {
      expect(() => { expandImagePath("../foo/bar"); }).to.throw();
    });
  });


  describe("image()", () => {
    afterEach(() => {
      delete global.devicePixelRatio;
    });

    it("is attached to the [css] function as a property", () => {
      expect(css.image).to.equal(image);
    });

    it("throws if an image was not specified", () => {
      expect(() => { image() }).to.throw();
    });

    it("returns the 1x resolution", () => {
      global.devicePixelRatio = 1;
      const result = image("1x", "2x");
      expect(result.backgroundImage).to.equal("url(1x)");
    });

    it("returns the 2x resolution", () => {
      global.devicePixelRatio = 2;
      const result = image("1x", "2x");
      expect(result.backgroundImage).to.equal("url(2x)");
    });

    it("returns the 1x resolution on hi-res screen when no 2x image (undefined)", () => {
      global.devicePixelRatio = 2;
      expect(image("1x", undefined, 10, 20).backgroundImage).to.equal("url(1x)");
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
  });

  describe("Image replacement via css() method", () => {
    it("replaces 'Image' with style settings (1x)", () => {
      global.devicePixelRatio = 1;
      const style = css({ Image:["1x", "2x", 20, 30] });
      expect(style.Image).to.equal(undefined);
      expect(style.backgroundImage).to.equal("url(1x)");
      expect(style.width).to.equal(20);
      expect(style.height).to.equal(30);
      expect(style.backgroundSize).to.equal("20px 30px");
      expect(style.backgroundRepeat).to.equal("no-repeat");
    });

    it("replaces 'Image' with style settings (2x)", () => {
      global.devicePixelRatio = 2;
      const style = css({ Image:["1x", "2x", 20, 30] });
      expect(style.Image).to.equal(undefined);
      expect(style.backgroundImage).to.equal("url(2x)");
    });

    it("uses the 1x resolution on hi-res screen when no 2x image (3-params)", () => {
      global.devicePixelRatio = 2;
      expect(css({ Image: ["1x", 10, 20] }).backgroundImage).to.equal("url(1x)");
    });
  });
});
