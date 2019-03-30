const HaversineTestUtil = require('./unit/HaversineTestUtil');
const FileTestUtil = require('./unit/FileTestUtil');
const MathTestUtil = require('./unit/MathTestUtil');
const SortTestUtil = require('./unit/SortTestUtil');
const ValidateTestUtil = require('./unit/ValidateTestUtil');
const IntegrationTestUtil = require('./integration/IntegrationTestUtil');

const haversineTestObj = new HaversineTestUtil();
const fileTestObj = new FileTestUtil();
const mathTestUtil = new MathTestUtil();
const sortTestObj = new SortTestUtil();
const validateTestUtil = new ValidateTestUtil();
const integrationTestObj = new IntegrationTestUtil();

haversineTestObj.testHaverstineBasic();
haversineTestObj.testHaverstineForRandomCoordinates();
haversineTestObj.testHaverstineAcrossWholeWorldInSteps();

fileTestObj.testFileToReadFrom();
fileTestObj.testDataFromFile();

mathTestUtil.testToRadian();
mathTestUtil.testAsin();
mathTestUtil.testMultByRadiusOfEarthInKM();

sortTestObj.testSortFunction();

validateTestUtil.testJSONData();
validateTestUtil.testValidateType();

integrationTestObj.testInvalidInputParameters();
integrationTestObj.testFileWithSameUserId();
integrationTestObj.testFileWithMissingProperty();
integrationTestObj.testFileWithDenseProperData();
integrationTestObj.testFileWithSparseProperData();
