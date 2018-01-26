'use strict';

const MathHelper = require('../../util/math');

/**
 * Util Class to get a Random Geo Point
 * Contains a very basic implementation
 * of haversine function to test against the actual implementation
 */
module.exports = class GeoPointTestUtil {
  constructor(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;
  }

  // returns random Double between the given range
  static generateRandomDouble(lowerBound, upperBound) {
    return ((Math.random() * (upperBound - lowerBound)) + lowerBound);
  }

  // returns next random latitude
  static nextLatitude() {
    return GeoPointTestUtil.generateRandomDouble(-90, 90);
  }

  // returns next random longitude
  static nextLongitude() {
    return GeoPointTestUtil.generateRandomDouble(-180, 180);
  }

  /**
   *  simple incorporation of the wikipedia formula
   *  Wiki: https://en.wikipedia.org/wiki/Haversine_formula#The_haversine_formula
   */
  static slowHaversine(p1, p2) {
    const {
      latitude: lat1,
      longitude: lon1
    } = p1;
    const {
      latitude: lat2,
      longitude: lon2
    } = p2;
    const h1 = (1 - Math.cos(MathHelper.toRadian(lat2) - MathHelper.toRadian(lat1))) / 2;
    const h2 = (1 - Math.cos(MathHelper.toRadian(lon2) - MathHelper.toRadian(lon1))) / 2;
    const h = h1 + (Math.cos(MathHelper.toRadian(lat1)) * Math.cos(MathHelper.toRadian(lat2)) * h2);
    return 2 * 6371.0087714 * Math.asin(Math.min(1, Math.sqrt(h)));
  }
};

