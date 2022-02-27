// テスト対象のファイル
const getTemperature = require("../src/getTemperature.js");

// モックを定義
jest.mock("../src/getJSON");
const getJSON = require("../src/getJSON.js");

// デフォルトでは0を返すように
getJSON.mockResolvedValue(0);

describe("getTemperature()", () => {
  // API部分のテスト
  test("Invokes the correct API", async () => {
    let expectedURL = "https://globaltemps.example.com/api/city/vancouver";
    let t = await(getTemperature("Vancouver"));
    expect(getJSON).toHaveBeenCalledWith(expectedURL);
  });

  // 返却値のテスト
  test("Converts C to F correctly", async () => {
    getJSON.mockResolvedValue(0);
    expect(await getTemperature("x")).toBe(32);

    getJSON.mockResolvedValue(81);
    expect(await getTemperature("x")).toBe(77);
  });
});
