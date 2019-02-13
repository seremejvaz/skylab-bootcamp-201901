const { expect } = require("chai");
const length = require("./length");

describe("first i/o", () => {
  it("should succeed with correct result", () => {
    const res = length('./index.js');

    expect(res).to.equal(13)
  });
});
