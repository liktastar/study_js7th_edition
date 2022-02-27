describe("section9", () => {
  test("class構文", async () => {
    // クラス宣言
    class Range {
      constructor(from, to) {
        this.from = from;
        this.to = to;
      }
      // インスタンスメソッド
      includes(x) { return this.from <= x && x <= this.to }
      *[Symbol.iterator]() {
        for (let x = Math.ceil(this.from); x <= this. to; x++) { yield x; }
      }
      toString() { return `(${this.from}...${this.to})`; }
      // 静的メソッド
      static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
          throw new TypeError(`Cannot parse Range from "${s}".`);
        }
        return new Range(parseInt(matches[1]), parseInt(matches[2]));
      }
    }
    // 生成
    let r = new Range(1, 3);
    expect(r.includes(3)).toBeTruethly;
    expect(r.includes(4)).toBeFalsely;
    expect([...r]).toEqual([1, 2, 3]);
    expect(String(r)).toBe("(1...3)");
    let r2 = Range.parse("(1...10)");
    expect(r2.toString()).toBe("(1...10)");

    // 継承
    class Sapn extends Range {
      constructor(start, length) {
        if (length >= 0) {
          super(start, start + length);
        } else {
          super(start + length, start);
        }
      }
    }
    // 生成
    let s1 = new Sapn(1, 2);
    let s2 = new Sapn(1, -2);
    expect(String(s1)).toBe("(1...3)");
    expect(String(s2)).toBe("(-1...1)");
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
