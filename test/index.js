const HaversineTestUtil = require('./HaversineTestUtil');
const FileTestUtil = require('./FileTestUtil');
const SortTestUtil = require('./SortTestUtil');
const IntegrationTestUtil = require('./IntegrationTestUtil');

const haversineTestObj = new HaversineTestUtil();
const fileTestObj = new FileTestUtil();
const sortTestObj = new SortTestUtil();
const integrationTestObj = new IntegrationTestUtil();

haversineTestObj.testHaverstineBasic();
haversineTestObj.testHaverstineForRandomCoordinates();
haversineTestObj.testHaverstineAcrossWholeWorldInSteps();

fileTestObj.testFileToReadFrom();
fileTestObj.testDataFromFile();
fileTestObj.testJSONData();

sortTestObj.testSortFunction();

integrationTestObj.testFileWithSameUserId();
integrationTestObj.testFileWithMissingProperty();
integrationTestObj.testFileWithDenseProperData();
integrationTestObj.testFileWithSparseProperData();
