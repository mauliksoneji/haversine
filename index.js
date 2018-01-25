const fs = require('fs');
const main = require('./src/index');

const configFile = process.env.config || './config/config.json';

const configurationData = fs.readFileSync(configFile);

const configJSONData = JSON.parse(configurationData);

const data_path = configJSONData.data_path;

const source_point = {
  latitude: configJSONData.latitude,
  longitude: configJSONData.longitude
};

const max_distance = configJSONData.max_distance;

const pointsWithinDistance = main(data_path, source_point, max_distance);

console.log(`Points in file path ${data_path} that are within ${max_distance} kms from latitude: ${source_point.latitude}, longitude: ${source_point.longitude} are`, pointsWithinDistance);
