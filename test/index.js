'use strict';

const HaversineTestUtil = require('./unit/HaversineTestUtil');
const FileTestUtil = require('./unit/FileTestUtil');
const SortTestUtil = require('./unit/SortTestUtil');
const IntegrationTestUtil = require('./integration/IntegrationTestUtil');

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

integrationTestObj.testInvalidInputParameters();
integrationTestObj.testFileWithSameUserId();
integrationTestObj.testFileWithMissingProperty();
integrationTestObj.testFileWithDenseProperData();
integrationTestObj.testFileWithSparseProperData();
