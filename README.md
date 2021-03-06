
# Haversine Distance Calculator

Given a source point, JSON data and maximum_distance from source point; the program gives the points that are within maximum__distance from the source point.


## Running the program In Development/Production Environment:

There are no external node modules required to run the program.

For development environment, 

ESLint is configured. All the required ESLint node modules are listed in package.json. You need to **npm install** to get ESLint configurations setup.

#### Installation Steps:
1. Install [node.js](https://nodejs.org/en/download/)
2. Install [npm](https://www.npmjs.com/get-npm)

To start the program, run the command **npm run start**.

The configuration is listed in **config/config.json** and the data points are taken from **data/data.txt**.

#### Running Tests:

The test cases are in **test** folder.

To run the tests, run the command **npm run test**

To check coverage, run the command **npm run coverage**

## Design Consideration

1. The data and config is placed separate from code and so that it can be changed without releasing the code. You can just change the data/config and re-run program to use updated data/config.

2. There are no external dependencies that are used in the program.

3. Tests cover individual function tests of different functionalities in separate files. Integration test tests the end result given by the program. 

4. To filter distances that are too far away, we have placed a planar distance filer which is faster than haversine distance and thus will weed out the far away points.

5. Parameters validation: In case of any invalid data in file containing points or input parameters like max_distance, source file path or source point throws InvalidDataError or FileNotFoundError.

6. Idempotent: There is no state maintained in database. Everytime you run the program by passing different parameters, it won't have any side effects.