// const section2 = require("../src/section2.js");

describe("number", () => {
  test("16進数は頭に0xをつける", async () => {
    expect(0xff).toBe(255);
  });

  test("2進数は頭に0bをつける", async () => {
    expect(0b10101).toBe(21);
  });

  test("8進数は頭に0oをつける", async () => {
    expect(0o377).toBe(255);
  });

  test("プラス0とマイナス0の概念がある", async () => {
    const positive0 = 0;
    const negative0 = -0;
    expect(positive0 === negative0).toBeTruthy();
    expect(positive0).not.toBe(negative0);
    expect(1 / positive0).not.toBe(1 / negative0);
  });

  test("小数は丸め誤差があることに注意", async () => {
    // どちらも手計算だと0.1なのに等しくない
    expect(0.3 - 0.2).not.toBe(0.2 - 0.1);
  });

  test("BigIntで64ビット整数を表す", async () => {
    let string = "1" + "0".repeat(100);
    let number = String(Number(string));
    expect(number).not.toBe(string);
    expect(number).toBe("1e+100");

    let bigint = String(BigInt(string));
    expect(bigint).toBe(string);
  });
});
