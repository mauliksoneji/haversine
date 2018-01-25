const fs = require('fs');

/**
 * Error Class of FileNotFound type
 */
class FileNotFoundError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, FileNotFoundError);
  }
}

/**
 * Reads syncronously from file,
 * converts it into JSON array
 * and validates the JSON array
 * by using validateInput function
 */
function readContentFromFileSync(fileName) {
  console.time('readContentFromFileSync');
  try {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const points = [];
    const contents = fileContent.split('\n');

    contents.forEach((content) => {
      const jsonContent = JSON.parse(content);
      points.push(jsonContent);
    });

    console.timeEnd('readContentFromFileSync');
    return points;
  } catch (error) {
    throw new FileNotFoundError(error.message);
  }
}

module.exports = {
  readContentFromFileSync,
  FileNotFoundError
};
