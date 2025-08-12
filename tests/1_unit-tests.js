const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("ConvertHandler", function () {
    test("convertHandler should correctly read a whole number input.", function () {
      assert.equal(1, convertHandler.getNum("1"));
    });
    test("convertHandler should correctly read a decimal number input.", function () {
      assert.equal(1.5, convertHandler.getNum("1.5"));
    });
    test("convertHandler should correctly read a fractional input.", function () {
      assert.equal(0.5, convertHandler.getNum("1/2"));
    });
    test("convertHandler should correctly read a fractional input with a decimal.", function () {
      assert.equal(0.5, convertHandler.getNum("1.0/2"));
    });
    test("convertHandler should correctly return an error on a double-fraction.", function () {
      assert.throws(() => convertHandler.getNum("1/2/3"));
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(1, convertHandler.getNum());
    });
    test("convertHandler should correctly read each valid input unit.", function () {
      assert.equal("km", convertHandler.getUnit("km"));
    });
    test("convertHandler should correctly return an error for an invalid input unit.", function () {
      assert.throws(() => convertHandler.getUnit("bla"));
    });
    test("convertHandler should return the correct return unit for each valid input unit.", function () {
      assert.equal("mi", convertHandler.getReturnUnit("km"));
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal("kilometers", convertHandler.spellOutUnit("km"));
    });
    test("convertHandler should correctly convert gal to L.", function () {
      assert.equal(3.78541, convertHandler.convert(1, "gal"));
    });
    test("convertHandler should correctly convert L to gal.", function () {
      assert.equal(1, convertHandler.convert(3.78541, "L"));
    });
    test("convertHandler should correctly convert mi to km.", function () {
      assert.equal(1.60934, convertHandler.convert(1, "mi"));
    });
    test("convertHandler should correctly convert km to mi.", function () {
      assert.equal(1, convertHandler.convert(1.60934, "km"));
    });
    test("convertHandler should correctly convert lbs to kg.", function () {
      assert.equal(0.453592, convertHandler.convert(1, "lbs"));
    });
    test("convertHandler should correctly convert kg to lbs.", function () {
      assert.equal(1, convertHandler.convert(0.453592, "kg"));
    });
  });
});
