const main = require('./src/index');

const IRELAND_OFFICE_COORDINATES = { latitude: 53.339428, longitude: -6.257664 };
const MAX_DISTANCE_FROM_OFFICE = 100;
const DATA_SOURCE_PATH = './data/data.txt';

const pointsWithin100Kms = main(DATA_SOURCE_PATH, IRELAND_OFFICE_COORDINATES, MAX_DISTANCE_FROM_OFFICE);

console.log('Offices that are within 100 kms distance of Ireland office are', pointsWithin100Kms);
