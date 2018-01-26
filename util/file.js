'use strict';

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
 * Converts file content to JSON array
 */
function convertToJSONArray(fileContent) {
  const points = [];
  const contents = fileContent.split('\n');

  contents.forEach((content) => {
    const jsonContent = JSON.parse(content);
    points.push(jsonContent);
  });
  return points;
}

/**
 * Reads syncronously from file,
 * converts it into JSON array
 */
function readContentFromFileSync(fileName) {
  try {
    console.time('readContentFromFileSync');
    const fileContent = fs.readFileSync(fileName, 'utf8');

    const points = convertToJSONArray(fileContent);

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
