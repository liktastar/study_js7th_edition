describe("section3", () => {
  test("条件付きプロパティ", async () => {
    let a = { };
    expect(a.b).toBeUndefined();
    expect(a.b?.c).toBeUndefined();

    let b = [];
    expect(b?.[1]?.b).toBeUndefined();

    let c = function(num, func) {
      return func?.(num);
    }
    expect(c(1, x => x + 1)).toBe(2);
    expect(c(1)).toBeUndefined();
  });

  test("ファーストディファインド演算子", async () => {
    let obj = { a: 0, b: 1 };
    // 定義済みであればその値を返す
    expect(obj.a ?? 500).toBe(0);
    expect(obj.c ?? 500).toBe(500);
    expect(obj.c ?? obj.b ?? 500).toBe(1);
    // || だとfalseとみなされる値の場合に正しく動かない
    expect(obj.a || 500).not.toBe(0); // 0はfalse
  });
});
