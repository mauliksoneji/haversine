'use strict';

const FileUtilHelper = require('../util/file');
const SortUtilHelper = require('../util/sort');
const ValidationUtilHelper = require('../util/validate');

const calculateHaversineDistance = require('../distance/haversine');
const filterByPlanarDistance = require('../distance/plane');

const InvalidDataError = ValidationUtilHelper.InvalidDataError;

/**
 * Checks if the Input parameters are proper
 */
function checkInputParameters(dataSourceFileName, sourcePoint, max_distance) {
  if (!dataSourceFileName || (typeof dataSourceFileName !== 'string')) {
    throw new InvalidDataError(`Invalid Path name: ${dataSourceFileName}`);
  }

  if (!sourcePoint || (typeof sourcePoint !== 'object') || !('longitude' in sourcePoint) || !('latitude' in sourcePoint)) {
    throw new InvalidDataError(`Invalid sourcePoint: ${sourcePoint}`);
  }

  if (!max_distance || (typeof max_distance !== 'number')) {
    throw new InvalidDataError(`Invalid max_distance: ${max_distance}`);
  }
}

/**
 * Takes in points array, source point
 * and the max distance to filter by.
 *
 * Does the following things:
 * 1. Filter out the points which are at 100 Km in North Direction or 100 Km in East Direction
 * 2. Filter by calculating Haverstine distance
 * 3. Sort points based on user_id
 * 4. Map the objects to contain only name and user_id field
 *
 * Returns points that are in 100 Kms distance from sourcePoint.
 */
function calculatePointsWithinDistance(points, sourcePoint, max_distance) {
  console.time('calculatePointsWithinDistance');
  const pointsWithinDistance = points.filter(point => filterByPlanarDistance(point, sourcePoint, max_distance))
                            .filter(point => calculateHaversineDistance(point, sourcePoint) < max_distance)
                            .sort(SortUtilHelper.sortByUserId)
                            .map(obj => ({
                              name: obj.name,
                              user_id: obj.user_id
                            }));
  console.timeEnd('calculatePointsWithinDistance');
  return pointsWithinDistance;
}

/**
 * The complete function that takes in:
 * 1. Data Source File Name which contains Points Data
 * 2. Source Point to calculate distance of Each Point
 * 3. Max Distance representing the distance to filter Points having greater distance
 *
 * The function does the following steps:
 * 1. Read Content from dataSourceFileName syncronously and convert to points JSON array.
 * 2. Validate points JSON array which is read from the file
 * 3. Filter the points having distance less than max_distance from sourcePoint
 *
 * @throws:
 * FileNotFoundError: If dataSourceFileName doesn't exist
 * InvalidDataError: If the file contains invalid data
 */
module.exports = function main(dataSourceFileName, sourcePoint, max_distance) {
  checkInputParameters(dataSourceFileName, sourcePoint, max_distance);

  console.time('totalTimeToFindPoints');

  const points = FileUtilHelper.readContentFromFileSync(dataSourceFileName); // read file and convert to JSON Array

  ValidationUtilHelper.validateInput(points); // Validate Input, throws Error in case of Invalid data

  const pointsWithinDistance = calculatePointsWithinDistance(points, sourcePoint, max_distance);
  console.timeEnd('totalTimeToFindPoints');

  return pointsWithinDistance;
};
