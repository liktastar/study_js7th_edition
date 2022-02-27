describe("section7", () => {
  test("配列のスプレッド演算子", async () => {
    let a = [1, 2, 3];
    let b = [0, ...a, 4];
    expect(b).toEqual([0, 1, 2, 3, 4]);

    let chars = [..."abc"];
    expect(chars).toEqual(["a", "b", "c"]);
  });

});
