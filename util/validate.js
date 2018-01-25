/**
 * Error Class of InvalidData type
 */
class InvalidDataError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidDataError);
  }
}

/**
 * Given a point object, it checks if point contains following fields:
 * 1. latitude
 * 2. user_id
 * 3. name
 * 4. longitude
 *
 * @throws InvalidDataError if any of the following fields don't exist in object
 */
function validateCordinate(point) {
  // List of keys that should be present in the point
  const keysToHave = [
    'latitude',
    'user_id',
    'name',
    'longitude'
  ];

  // Iterate over the list of keys and check if all these keys are present
  for (const key of keysToHave) {
    if (!point[key]) {
      throw new InvalidDataError(`There is no property ${key} in the point ${point}`);
    }
  }
}

/**
 * Checks if all the points in the array
 * contain different user_id
 *
 * @throws InvalidDataError if user_id field is not unique in each element in points array
 */
function checkForUniqueUserIds(points) {
  const userIdsInPoints = points.map(obj => obj.user_id);

  const uniqueUserIds = userIdsInPoints.filter((value, index, self) => self.indexOf(value) === index);

  if (uniqueUserIds.length !== points.length) {
    throw new InvalidDataError('user_id field should be unique in points array' + uniqueUserIds + userIdsInPoints);
  }
}

/**
 * Checks if the input is valid or not.
 * It checks for the following things:
 *
 * 1. Checks if points is an array
 * 2. Checks if user_id, latitude, longitude and name fields are present in each point
 * 3. Checks if all the user_id are unique
 *
 * @throws InvalidDataError if any of conditions don't match
 */
function validateInput(points) {
  console.time('validateInput');
  // check if the points array is proper
  if (!points || points.constructor !== Array) {
    throw new InvalidDataError('Points is undefined or not an array');
  }

  // validate each and every point to contain properties
  points.forEach(validateCordinate);

  // check for unique user_id in each point
  checkForUniqueUserIds(points);
  console.timeEnd('validateInput');
}

module.exports = {
  validateInput,
  InvalidDataError
};
