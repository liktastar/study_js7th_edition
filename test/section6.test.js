describe("section6", () => {
  test("プロパティ継承のチェーン", async () => {
    let o = {};
    o.x = 1;
    let p = Object.create(o);
    p.y = 2;
    let q = Object.create(p);
    q.z = 3;
    // p.xでアクセス可能
    expect(q.x + q.y + q.z).toBe(6);

    // プロパティの有無について
    // 単にある場合はin句
    expect("x" in q).toBeTruethly;
    // 独自プロパティであるならhasOwnProperty
    expect(q.hasOwnProperty("x")).toBeFalsely;
    expect(o.hasOwnProperty("x")).toBeTruethly;
  });

  test("オブジェクトのコピー", async () => {
    let position = { x: 0.5, y: 1 };
    let dimensions = { width: 100, height: 75 };
    // スプレッド演算子によって展開
    let rect = { ...position, ...dimensions };
    expect(rect.x + rect.y + rect.width + rect.height).toBe(176.5);
  });
});
