'use strict';

const MathHelper = require('../util/math');

/**
 * Used to filter out points that have longitudanal or latitudanal distance
 * greater than max_distance
 *
 * returns true: if points that have distance between longitude or latitude
 * greater than max_distance
 */
module.exports = function filterByPlanarDistance(p1, p2, max_distance) {
  const lat2 = p2.latitude;
  const lat1 = p1.latitude;
  const latitudanalCosAngle = MathHelper.toRadian((lat2 + lat1) / 2.0);
  const x = MathHelper.toRadian(p2.longitude - p1.longitude) * Math.cos(latitudanalCosAngle);
  const longitudanalFactor = Math.sqrt(x * x);

  const longitudeDistance = MathHelper.multByRadiusOfEarthInKM(longitudanalFactor);

  // If longitudanal distance > max_distance, return false
  if (longitudeDistance > max_distance) {
    return false;
  }

  const y = MathHelper.toRadian(p2.latitude - p1.latitude);
  const latitudanalFactor = Math.sqrt(y * y);

  const latitudanalDistance = MathHelper.multByRadiusOfEarthInKM(latitudanalFactor);

  // If latitudanal distance > max_distance, return false
  if (latitudanalDistance > max_distance) {
    return false;
  }
  return true;
};
