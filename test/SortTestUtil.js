const assert = require('assert');
const SortUtilHelper = require('../util/sort');

// data to sort
const data = [
  { latitude: '53.521111', user_id: 20, name: 'Enid Enright', longitude: '-9.831111' },
  { latitude: '51.802', user_id: 21, name: 'David Ahearn', longitude: '-9.442' },
  { latitude: '37.0448882', user_id: 5, name: 'McDonalds', longitude: '-97.32171475' },
  { latitude: '37.14818046', user_id: 3, name: 'Dominos', longitude: '-96.41976282' },
  { latitude: '36.96079858', user_id: 7, name: 'Restaurant', longitude: '-94.27965342' },
  { latitude: '34.44034434', user_id: 22, name: 'Indian Restaurant', longitude: '-96.00860137' },
  { latitude: '37.84666009', user_id: 11, name: 'Chinese Restaurant', longitude: '-94.14724962' }
];

// expected sort result of the above data
const sortedData = [
  { latitude: '37.14818046', user_id: 3, name: 'Dominos', longitude: '-96.41976282' },
  { latitude: '37.0448882', user_id: 5, name: 'McDonalds', longitude: '-97.32171475' },
  { latitude: '36.96079858', user_id: 7, name: 'Restaurant', longitude: '-94.27965342' },
  { latitude: '37.84666009', user_id: 11, name: 'Chinese Restaurant', longitude: '-94.14724962' },
  { latitude: '53.521111', user_id: 20, name: 'Enid Enright', longitude: '-9.831111' },
  { latitude: '51.802', user_id: 21, name: 'David Ahearn', longitude: '-9.442' },
  { latitude: '34.44034434', user_id: 22, name: 'Indian Restaurant', longitude: '-96.00860137' }
];


module.exports = class SortTestUtil {
  // function to test sortByUserId function
  testSortFunction() {
    const calculatedSortedData = data.sort(SortUtilHelper.sortByUserId);
    assert.deepStrictEqual(calculatedSortedData, sortedData, 'Sort By UserId Function has failed to sort by user_id');
  }
};
