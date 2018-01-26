'use strict';

const DEGREE_TO_RADIANS = Math.PI / 180;

const EARTH_RADIUS_IN_KILOMETERS = 6371.0087714;

/**
 * Converts Degree to Radian
 * @param {Number} degree
 */
function toRadian(degree) {
  return degree * DEGREE_TO_RADIANS;
}

/**
 * Math.asin wrapper
 * which provides return value between -1 and 1
 * @param {Number} value
 */
function asin(value) {
  const angleValue = Math.max(Math.min(1, value), -1);
  return Math.asin(angleValue);
}

/**
 * Multiples the given value with
 * the radius of Earth
 * @param {Number} factor
 */
function multByRadiusOfEarthInKM(factor) {
  return EARTH_RADIUS_IN_KILOMETERS * factor;
}

module.exports = {
  toRadian,
  asin,
  multByRadiusOfEarthInKM
};
