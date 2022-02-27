class Range {
  constructor (from, to) {
    this.from = from;
    this.to = to;
  }
  has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }
  toString() { return `{ x | ${this.from} <= x <= ${this.to}}`; }
  // イテレータ
  // [Symbol.iterator]() {
  //   let next = Math.ceil(this.from);
  //   let last = this.to;
  //   return {
  //     next() { return (next <= last) ? { value: next++ } : { done: true }; },
  //     [Symbol.iterator]() { return this; }
  //   };
  // }
  // ジェネレータを使ってイテレータを作成
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  }
}
module.exports = Range;