const assert = require('assert');

const findPointsWithinRange = require('../src');
const ValidateUtilHelper = require('../util/validate');

const InvalidDataError = ValidateUtilHelper.InvalidDataError;

const SOURCE_COORDINATES = { latitude: 37.09024, longitude: -95.71289100000001 };

module.exports = class IntegrationTestUtil {
  /**
   * Checks if reading from file having same user id content
   * throw an InvalidDataError error
   */
  testFileWithSameUserId() {
    assert.throws(() => findPointsWithinRange('./data/improper_test_same_user_id_data.txt'), (err) => {
      if ((err instanceof InvalidDataError) && /user_id field should be unique/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw user_id field should be unique exception');
  }

  /**
   * Checks if reading from file containing missing fields like:
   * 1. longitude
   * 2. latitude
   * 3. user_id
   * 4. name
   *
   * throws an InvalidDataError error
   */
  testFileWithMissingProperty() {
    assert.throws(() => findPointsWithinRange('./data/improper_test_missing_fields_data.txt'), (err) => {
      if ((err instanceof InvalidDataError) && /There is no property/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property exception');
  }

  /**
   * Checks if file
   * having geo locations that are nearby away
   * returns valid data
   */
  testFileWithDenseProperData() {
    const max_distance = 100;
    const pointsWithinDistance = findPointsWithinRange('./data/proper_dense_test_data.txt', SOURCE_COORDINATES, max_distance);

    const expectedResult = [ { name: 'Joby Rudefort', user_id: 3 },
    { name: 'Taco Bell', user_id: 67 },
    { name: 'Dominos', user_id: 88 } ];

    assert.deepStrictEqual(pointsWithinDistance, expectedResult, 'testFileWithDenseProperData: Function to filter points by using Haversine Distance is not giving proper results');
  }

  /**
   * Checks if file containing 2000 data points
   * having geo locations that are far away
   * returns valid data
   */
  testFileWithSparseProperData() {
    const max_distance = 500;
    const pointsWithinDistance = findPointsWithinRange('./data/proper_sparse_test_data.txt', SOURCE_COORDINATES, max_distance);

    const expectedResult = [{ name: 'Jillian Gun', user_id: 802 },
    { name: 'Zedekiah Grelik', user_id: 866 },
    { name: 'Yoshi Brownhill', user_id: 885 },
    { name: 'Curcio Manwell', user_id: 981 },
    { name: 'Saraann Hainge', user_id: 1595 }];

    assert.deepStrictEqual(pointsWithinDistance, expectedResult, 'testFileWithSparseProperData: Function to filter points by using Haversine Distance is not giving proper results');
  }
};
