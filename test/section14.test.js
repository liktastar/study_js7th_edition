describe("section14", () => {
  test("プロパティを参照", async () => {
    let target = Object.getOwnPropertyDescriptor({ x: 1 }, "x");
    const expected = {
      value: 1, writable: true, enumerable: true, configurable: true
    };
    expect(target).toEqual(expected);
  });

  test("プロパティを設定", async () => {
    let o = {};
    Object.defineProperty(o, "x", {
      value: 1, writable: true, enumerable: false, configurable: true
    });
    expect(o.x).toBe(1);
    expect(Object.keys(o)).toEqual([]); // 列挙不可

    // 値の書き換えはできない
    expect(this === undefined).toBeFalsy(); // strictモードだとtrue, それ以外はfalse
    Object.defineProperty(o, "x", { writable: false });
    o.x = 2; // 何も起きない (strictモードだとTypeErrorをスロー)
    expect(o.x).toBe(1);

    // 再定義は可能
    Object.defineProperty(o, "x", { value: 2 });
    expect(o.x).toBe(2);

    // データプロパティからアクセッサプロパティに変更
    // valueがなくなる代わりにgetで値を取得
    Object.defineProperty(o, "x", { get: function () { return 0; }});
    expect(o.x).toBe(0);
  });

  test("オブジェクトの凍結", async () => {
    let o = Object.freeze({ x: 1 });
    // 変更不可
    o.x = 2;
    o.y = 2;
    expect(o.x).toBe(1);
    expect(o.y).toBeUndefined();
    expect(Object.isFrozen(o)).toBeTruthy();
  });

  test("プロトタイプ属性", async () => {
    expect(Object.getPrototypeOf({})).toBe(Object.prototype);
    expect(Object.getPrototypeOf([])).toBe(Array.prototype);
    expect(Object.getPrototypeOf(() => {})).toBe(Function.prototype);

    let p = { x: 1 };
    let o = Object.create(p);
    expect(p.isPrototypeOf(o)).toBeTruthy();
    expect(Object.prototype.isPrototypeOf(p)).toBeTruthy();
    expect(Object.prototype.isPrototypeOf(o)).toBeTruthy();

    o = { x: 1 };
    p = { y: 2 };
    Object.setPrototypeOf(o, p);
    expect(o.y).toBe(2);

    // 古い実装
    p = { z: 3 };
    o = { x: 1, y: 2, __proto__: p }
    expect(o.z).toBe(3);
  });

  test("Symbol.hasInstance", async () => {
    let unit8 = {
      [Symbol.hasInstance](x) {
        return Number.isInteger(x) && x >= 0 && x <= 255;
      }
    }
    expect(128 instanceof unit8).toBeTruthy();
    expect(256 instanceof unit8).toBeFalsy();
    expect(Math.PI instanceof unit8).toBeFalsy();
  });

  test("Symbol.toStringTag", async () => {
    // クラス属性を文字列で取得
    expect({}.toString()).toBe("[object Object]");

    function classof(o) {
      return Object.prototype.toString.call(o).slice(8, -1);
    }
    expect(classof(null)).toBe("Null");
    expect(classof(undefined)).toBe("Undefined");
    expect(classof(1)).toBe("Number");
    expect(classof(10n ** 100n)).toBe("BigInt");
    expect(classof("")).toBe("String");
    expect(classof(false)).toBe("Boolean");
    expect(classof(Symbol())).toBe("Symbol");
    expect(classof({})).toBe("Object");
    expect(classof([])).toBe("Array");
    expect(classof(/./)).toBe("RegExp");
    expect(classof(() => { })).toBe("Function");
    expect(classof(new Map())).toBe("Map");
    expect(classof(new Set)).toBe("Set");
    expect(classof(new Date())).toBe("Date");

    // 独自クラスにもクラス属性をつけることが可能
    class Range {
      get [Symbol.toStringTag]() { return "Range" };
    }
    let r = new Range();
    expect(Object.prototype.toString.call(r)).toBe("[object Range]");
    expect(classof(r)).toBe("Range");
  });

  test("Proxy API", async () => {
    let t = { x: 1, y: 2 };
    let p = new Proxy(t, {});
    expect(p.x).toBe(1);

    delete p.y;
    expect(t.y).toBeUndefined(); // tのプロパティも削除される

    p.z = 3;
    expect(t.z).toBe(3); // tのプロパティにもセットされる
  })
});

