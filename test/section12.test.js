describe("section12", () => {
  test("nodeのコールバック", async () => {
    const fs = require("fs");
    let opotions = {};
    fs.readFile("./test/config.json", "utf-8", (err, text) => {
      if (err) {
        throw new Error("failed");
      }
    });
  });
});

