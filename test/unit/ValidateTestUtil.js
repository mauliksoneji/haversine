const assert = require('assert');
const ValidateUtilHelper = require('../../util/validate');

const InvalidDataError = ValidateUtilHelper.InvalidDataError;

module.exports = class ValidateTestUtil {
  /**
   * Checks if the function:
   *
   * 1. throws InvalidDataError if data is improper
   * 2. provides proper result if data is proper
   */
  testJSONData() {
    const goodJSONData = {
      user_id: 1,
      longitude: 15,
      latitude: 20,
      name: 'Maulik Soneji'
    };
    const anotherGoodJSONData = {
      user_id: 2,
      longitude: 15,
      latitude: 20,
      name: 'Khyati Soneji'
    };

    const badJSONDataWithoutUserId = {
      longitude: 15,
      latitude: 20,
      name: 'Hemendra Soneji'
    };

    const badJSONDataWithoutLatitude = {
      user_id: 10,
      longitude: 15,
      name: 'Asmita Soneji'
    };

    const badJSONDataWithoutLongitude = {
      user_id: 10,
      latitude: 20,
      name: 'Atul Soneji'
    };

    const badJSONDataWithoutName = {
      user_id: 10,
      longitude: 15,
      latitude: 20,
    };

    const improperJSONArrayMissingUserId = [badJSONDataWithoutUserId, goodJSONData];
    const improperJSONArrayMissingLatitude = [badJSONDataWithoutLatitude, goodJSONData];
    const improperJSONArrayMissingLongitude = [badJSONDataWithoutLongitude, goodJSONData];
    const improperJSONArrayMissingName = [badJSONDataWithoutName, goodJSONData];

    const improperJSONArrayWithRepeatingUserId = [goodJSONData, goodJSONData];

    const properJSONArrayData = [goodJSONData, anotherGoodJSONData];

    // check if InvalidDataError if points is null
    assert.throws(() => ValidateUtilHelper.validateInput(null), (err) => {
      if ((err instanceof InvalidDataError) && /Points is undefined or not an array/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property user_id exception');

    // check if InvalidDataError if points is not an array
    assert.throws(() => ValidateUtilHelper.validateInput('non array input'), (err) => {
      if ((err instanceof InvalidDataError) && /Points is undefined or not an array/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property user_id exception');

    // check if InvalidDataError of no property user_id gets thrown
    assert.throws(() => ValidateUtilHelper.validateInput(improperJSONArrayMissingUserId), (err) => {
      if ((err instanceof InvalidDataError) && /no property user_id/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property user_id exception');

    // check if InvalidDataError of no property latitude gets thrown
    assert.throws(() => ValidateUtilHelper.validateInput(improperJSONArrayMissingLatitude), (err) => {
      if ((err instanceof InvalidDataError) && /no property latitude/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property latitude exception');

    // check if InvalidDataError of no property longitude gets thrown
    assert.throws(() => ValidateUtilHelper.validateInput(improperJSONArrayMissingLongitude), (err) => {
      if ((err instanceof InvalidDataError) && /no property longitude/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property longitude exception');

    // check if InvalidDataError of no property name gets thrown
    assert.throws(() => ValidateUtilHelper.validateInput(improperJSONArrayMissingName), (err) => {
      if ((err instanceof InvalidDataError) && /no property name/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no property name exception');

    // check if InvalidDataError of user_id field should be unique
    assert.throws(() => ValidateUtilHelper.validateInput(improperJSONArrayWithRepeatingUserId), (err) => {
      if ((err instanceof InvalidDataError) && /user_id field should be unique/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw user_id field should be unique exception');

    // check if proper data does not throw any error
    assert.doesNotThrow(() => ValidateUtilHelper.validateInput(properJSONArrayData), InvalidDataError, 'Expected data to be a proper JSON array');
    console.log('testJSONData => Successfully Completed');
  }

  /**
   * Test validateType function
   */
  testValidateType() {
    assert.equal(ValidateUtilHelper.validateType(null), false);
    assert.equal(ValidateUtilHelper.validateType('some string', 'number'), false);
    assert.equal(ValidateUtilHelper.validateType('some string', 'string'), true);
  }
};
