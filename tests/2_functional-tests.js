const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.6417217685798895);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(
          res.body.string,
          "10 l converts to 2.6417217685798895 gal"
        );
        done();
      });
  });
  test("Convert a valid input without number such as kg", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 2.2046244201837775);
        assert.equal(res.body.returnUnit, "lbs");
        assert.equal(
          res.body.string,
          "1 kg converts to 2.2046244201837775 lbs"
        );
        done();
      });
  });
  test("Convert an invalid input such as 32g", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 404);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("Convert an invalid number such as 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 404);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 404);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
});
