describe("section11", () => {
  test("for ofの仕組み", async () => {
    let arr = [99];
    // for ofをイテレータを用いて書き直すと以下のようになる
    let iterator = arr[Symbol.iterator]();
    for (let result = iterator.next(); !result.done; result = iterator.next()) {
      expect(result.value).toBe(99);
    }
  });

  test("イテレータの動き", async () => {
    let list = [1, 2, 3, 4, 5];
    let iter = list[Symbol.iterator]();
    let head = iter.next().value;
    let tail = [...iter];
    expect(head).toBe(1);
    expect(tail).toEqual([2, 3, 4, 5]);
  });

  test("独自実装のイテレータ", async () => {
    const Range = require("../src/range.js");
    let range = new Range(-2.2, 2);
    let arr = [];
    for (let a of range) {
      arr.push(a);
    }
    expect(arr).toEqual([-2, -1, 0, 1, 2]);
  });

  test("ジェネレータ", async () => {
    function* oneDigitPrimes() {
      yield 2;
      yield 3;
      yield 5;
      yield 7;
    }
    let primes = oneDigitPrimes();
    expect(primes.next().value).toBe(2);
    expect(primes.next().value).toBe(3);
    expect(primes.next().value).toBe(5);
    expect(primes.next().value).toBe(7);
    expect(primes.next().done).toBeTruethly;
    
    expect([...oneDigitPrimes()]).toEqual([2, 3, 5, 7]);

    let sum = 0;
    for (let prime of oneDigitPrimes()) sum += prime;
    expect(sum).toBe(17);
  });

  test("再帰的ジェネレータ", async () => {
    function* sequence(...iterables) {
      for (let iterable of iterables) {
        for (let item of iterable) {
          yield item;
        }
      }
    }
    expect([...sequence([2], "abc", [3, 5])]).toEqual([2, "a", "b", "c", 3, 5]);

    // yield* を使えばさらに短く書ける
    function* sequence2(...iterables) {
      for (let iterable of iterables) {
        yield* iterable;
      }
    }
    expect([...sequence2([2], "abc", [3, 5])]).toEqual([2, "a", "b", "c", 3, 5]);
  });
});
