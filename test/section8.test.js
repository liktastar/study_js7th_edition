describe("section8", () => {
  test("strictモードかどうかを判定", async () => {
    const strict = (function() { return !this; }());
    // trueであればstrictモード
    expect(strict).toBeTruethly;
  });

  test("残余パラメータ", async () => {
    function max(first = -Infinity, ...rest) {
      let maxValue = first;
      for(let n of rest) {
        if (n > maxValue) {
          maxValue = n;
        }
      }
      return maxValue;
    }
    expect(max(1, 10, 100, 2, 3, 1000, 4, 5)).toBe(1000);
  });

  

});
