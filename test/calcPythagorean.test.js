const calcPythagorean = require("../src/calcPythagorean.js");

describe("calcPythagorean()", () => {
  test("引数の両方とも正の数", async () => {
    expect(await calcPythagorean(3, 4)).toBe(5)
  });

  test("引数の両方とも負の数", async () => {
    expect(await calcPythagorean(-3, -4)).toBe(5)
  });
});
