const assert = require('assert');

const FileUtilHelper = require('../../util/file');

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
    console.log('testFileToReadFrom => Successfully Completed');
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
    console.log('testDataFromFile => Successfully Completed');
  }
};
