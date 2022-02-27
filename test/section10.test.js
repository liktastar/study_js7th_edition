describe("section10", () => {
  // Nodeの構文
  test("require構文によるインポート", async () => {
    // オブジェクト全体のインポート
    const stats = require("../src/stats.js");
    const arr = [1, 2, 3]
    expect(stats.mean(arr)).toBe(2);
    expect(stats.stddev(arr)).toBe(1);

    // 分割代入によって必要な関数のみインポート
    const { stddev } = require("../src/stats.js");
    expect(stddev(arr)).toBe(1);
  });

  // ES6の構文
  // Jestでimportを使うにはコツがいるらしい
  // test("import構文によるインポート", async () => {
  //   import { mean, stddev } from "../src/stats.js";
  //   const arr = [1, 2, 3]
  //   expect(mean(arr)).toBe(2);
  //   expect(stddev(arr)).toBe(1);
  // });
});
