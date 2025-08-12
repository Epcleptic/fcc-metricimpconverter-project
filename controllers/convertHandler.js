function ConvertHandler() {
  this.getNum = function (input = undefined) {
    if (!input) {
      return 1;
    }

    if (isNaN(input) && input.match(/^\d+(\.\d+)?\/\d+(\.\d+)?$/)) {
      numbers = input.split("/");
      return Number(numbers[0]) / Number(numbers[1]);
    } else if (!isNaN(input)) {
      return Number(input);
    } else {
      throw Error;
    }
  };

  this.UNITS = {
    gal: "l",
    l: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs",
  };

  this.SPELLED_OUT = {
    gal: "gallons",
    l: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms",
  };

  this.getUnit = function (input) {
    const parsedInput = input.toLowerCase().trim();
    if (parsedInput in this.UNITS) {
      return parsedInput;
    } else {
      throw Error;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const parsedUnit = initUnit.toLowerCase().trim();
    if (parsedUnit in this.UNITS) {
      const returnUnit = this.UNITS[parsedUnit];
      return returnUnit == "l" ? "L" : returnUnit;
    } else {
      throw Error;
    }
  };

  this.spellOutUnit = function (unit) {
    const parsedUnit = unit.toLowerCase().trim();
    if (parsedUnit in this.SPELLED_OUT) {
      return this.SPELLED_OUT[parsedUnit];
    } else {
      throw Error;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    initNum = this.getNum(initNum);
    initUnit = this.getUnit(initUnit);

    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "l":
        return initNum / galToL;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
    }

    throw Error;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
