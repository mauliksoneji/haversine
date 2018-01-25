
const MathHelper = require('../util/math');

/**
 * Calculates the haversine distance between two points.
 * Accepts two points P1 and P2.
 * Both P1 and P2 should have longitude and latitude as fields.
 * @param {longitude, latitude} p1
 * @param {longitude, latitude} p2
 *
 * Calculated as per: https://en.wikipedia.org/wiki/Haversine_formula#The_haversine_formula
 */
module.exports = function calculateHaversineDistance(p1, p2) {
  const lat1 = MathHelper.toRadian(p1.latitude);
  const lat2 = MathHelper.toRadian(p2.latitude);

  const val1 = 1 - Math.cos(lat1 - lat2);
  const val2 = 1 - Math.cos(MathHelper.toRadian(p1.longitude - p2.longitude));

  const centralAngle = val1 + (Math.cos(lat1) * Math.cos(lat2) * val2);
  const factor = 2 * MathHelper.asin(Math.sqrt(centralAngle * 0.5));

  const distanceInKms = MathHelper.multByRadiusOfEarthInKM(factor);

  p1.distance = distanceInKms;
  return distanceInKms;
};
