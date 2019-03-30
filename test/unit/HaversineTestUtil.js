const assert = require('assert');
const GeoPointTestUtil = require('./GeoPointTestUtil');

const calculateHaversineDistance = require('../../distance/haversine');

// accuracy for Haversin Delta
const HAVERSIN_DELTA = 1E-3;

function getErrorMessageWithDistance(lat1, lon1, lat2, lon2, p2, calculatedDistance, actualDistance) {
  return `Failed for points p1: {longitude: ${lon1}, latitude: ${lat1}} and 
  p2: {longitude: ${lon2}, latitude: ${lat2}}. Calculated distance: ${calculatedDistance} and Actual Distance: ${actualDistance}`;
}

function getErrorMessage(lat1, lon1, lat2, lon2) {
  return `Failed for points p1: {longitude: ${lon1}, latitude: ${lat1}} and p2: {longitude: ${lon2}, latitude: ${lat2}}`;
}

module.exports = class HaversineTestUtil {
  /**
   * Basic function to test validity
   * of Haverstine distance of value 0
   */
  testHaverstineBasic() {
    assert.ok(isNaN(calculateHaversineDistance(new GeoPointTestUtil(1, 1), new GeoPointTestUtil(1, NaN))), getErrorMessage(1, 1, 1, NaN));
    assert.ok(isNaN(calculateHaversineDistance(new GeoPointTestUtil(1, 1), new GeoPointTestUtil(NaN, 1))), getErrorMessage(1, 1, NaN, 1));
    assert.ok(isNaN(calculateHaversineDistance(new GeoPointTestUtil(1, NaN), new GeoPointTestUtil(1, 1))), getErrorMessage(1, NaN, 1, 1));
    assert.ok(isNaN(calculateHaversineDistance(new GeoPointTestUtil(NaN, 1), new GeoPointTestUtil(1, 1))), getErrorMessage(1, NaN, 1, 1));

    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(0, 0), new GeoPointTestUtil(0, 0)), getErrorMessage(0, 0, 0, 0));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(0, -180), new GeoPointTestUtil(0, -180)), getErrorMessage(0, -180, 0, -180));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(0, -180), new GeoPointTestUtil(0, 180)), getErrorMessage(0, -180, 0, 180));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(0, 180), new GeoPointTestUtil(0, 180)), getErrorMessage(0, 180, 0, 180));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(90, 0), new GeoPointTestUtil(90, 0)), getErrorMessage(90, 0, 90, 0));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(90, -180), new GeoPointTestUtil(90, -180)), getErrorMessage(90, -180, 90, -180));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(90, -180), new GeoPointTestUtil(90, 180)), getErrorMessage(90, -180, 90, 180));
    assert.equal(0, calculateHaversineDistance(new GeoPointTestUtil(90, 180), new GeoPointTestUtil(90, 180)), getErrorMessage(90, 180, 90, 180));

    console.log('testHaverstineBasic => Successfully Completed');
  }

  /**
   * Test for random 100,000 samples of co-ordinates
   */
  testHaverstineForRandomCoordinates() {
    for (let i = 0; i < 100000; i++) { // Test for 100,000 Random Co-ordinates
      const lat1 = GeoPointTestUtil.nextLatitude();
      const lon1 = GeoPointTestUtil.nextLongitude();
      const lat2 = GeoPointTestUtil.nextLatitude();
      const lon2 = GeoPointTestUtil.nextLongitude();

      const expected = calculateHaversineDistance(lat1, lon1, lat2, lon2);
      if (expected < 1000000) {
        const actual = GeoPointTestUtil.slowHaversine(lat1, lon1, lat2, lon2);
        assert.ok(Math.abs(expected - actual) < HAVERSIN_DELTA, getErrorMessage(lat1, lon1, lat2, lon2));
      }
    }
    console.log('testHaverstineForRandomCoordinates => Successfully Completed');
  }

  /**
   * Tests haversine distance between points
   * of all the range of latitude and longitude
   * in Intervals of 10 points.
   */
  testHaverstineAcrossWholeWorldInSteps() {
    for (let lat1 = -90; lat1 <= 90; lat1 += 10) { // For all latitudes between [-90,90]
      for (let lon1 = -180; lon1 <= 180; lon1 += 10) { // For all longitudes between [-180,180]
        for (let lat2 = -90; lat2 <= 90; lat2 += 10) {
          for (let lon2 = -180; lon2 <= 180; lon2 += 10) {
            const p1 = new GeoPointTestUtil(lat1, lon1);
            const p2 = new GeoPointTestUtil(lat2, lon2);

            const calculatedDistance = calculateHaversineDistance(p1, p2);
            const actualDistance = GeoPointTestUtil.slowHaversine(p1, p2);

            assert.ok(Math.abs(calculatedDistance - actualDistance) < HAVERSIN_DELTA, getErrorMessageWithDistance(lat1, lon1, lat2, lon2, calculatedDistance, actualDistance));
          }
        }
      }
    }
    console.log('testHaverstineAcrossWholeWorldInSteps => Successfully Completed');
  }
};
