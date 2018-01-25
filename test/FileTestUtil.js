const assert = require('assert');

const FileUtilHelper = require('../util/file');
const ValidateUtilHelper = require('../util/validate');

const InvalidDataError = ValidateUtilHelper.InvalidDataError;
const FileNotFoundError = FileUtilHelper.FileNotFoundError;

module.exports = class FileTestUtil {
  /**
   * Checks if reading from a random file
   * throws FileNotFoundError
   */
  testFileToReadFrom() {
    assert.throws(() => FileUtilHelper.readContentFromFileSync('./random_file_name.txt'), (err) => {
      if ((err instanceof FileNotFoundError) && /no such file/.test(err)) {
        return true;
      }
      return false;
    }, 'Expected to throw no such file found exception');

    assert.doesNotThrow(() => FileUtilHelper.readContentFromFileSync('./data/data.txt'), FileNotFoundError, 'Expected to read file content from data.txt');
  }

  /**
   * Checks if the readContentFromFileSync function does the following:
   * 1. Reads data properly and returns an array
   * 2. Each data point read is a JSON object
   */
  testDataFromFile() {
    const jsonData = FileUtilHelper.readContentFromFileSync('./data/data.txt');

    assert.ok(jsonData.constructor === Array, 'Expected data in file(data.txt) to transform to JSON array');

    for (const point of jsonData) {
      assert.ok(point.constructor === Object, `Expected data to contain JSON objects, instead got ${point.constructor}`);
    }
  }

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
  }
};
