const assert = require('assert');
const MathUtilHelper = require('../../util/math');

module.exports = class MathTestUtil {
  testAsin() {
    assert.equal(MathUtilHelper.asin(1), Math.PI / 2);
  }

  testToRadian() {
    assert.equal(MathUtilHelper.toRadian(180), Math.PI);
  }

  testMultByRadiusOfEarthInKM() {
    assert.equal(MathUtilHelper.multByRadiusOfEarthInKM(1), 6371.0087714);
  }
};
