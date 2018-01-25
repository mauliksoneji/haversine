
#### Haversine Distance Calculator

Given a source point, JSON data and maximum_distance from source point; the program gives the points that are within maximum__distance from the source point.


#### Running the program:

There are no external node modules required to run the program.

For development environment, 

ESLint is configured. All the required ESLint node modules are listed in package.json. You need to **npm install or yarn** to get ESLint configurations setup.

To start the program, run the command **npm run start**.

The configuration is listed in **config/config.json** and the data points are taken from **data/data.txt**.

#### Running Tests:

The test cases are in **test** folder.

To run the tests, run the command **npm run test**

#### Design Consideration

1. The data and config is placed separate from code and so that it can be changed without releasing the code. You can just change the data/config and re-run program to use updated data/config.

2. There are no external dependencies that are used in the program.

3. Tests cover individual function tests of different functionalities in separate files. Integration test tests the end result given by the program. 

4. To filter distances that are too far away, we have placed a planar distance filer which is faster than haversine distance and thus will weed out the far away points.
