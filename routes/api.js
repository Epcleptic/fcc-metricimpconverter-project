"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input.match("([0-9./]+)?([a-zA-Z]+)");
    if (input) {
      try {
        const errors = [];

        let initNum;
        try {
          initNum = convertHandler.getNum(
            input.length == 3 ? input[1] : undefined
          );
        } catch {
          errors.push("number");
        }

        let initUnit;
        try {
          initUnit = convertHandler.getUnit(
            input.length == 3 ? input[2] : input[1]
          );
        } catch {
          errors.push("unit");
        }

        if (errors.length > 0) {
          res
            .status(404)
            .type("text")
            .send("invalid " + errors.join(" and "));
          return;
        }

        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const string = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
        initUnit = initUnit == "l" ? "L" : initUnit;
        res.json({ initNum, initUnit, returnNum, returnUnit, string });
      } catch {
        res.status(404).type("text").send("invalid unit");
      }
    } else {
      res.status(404).type("text").send("invalid unit");
    }
  });
};
