# image-processing project

## Installation:
git clone the repo and install it's dependancies with: 

`npm i`

## Running the project:
to run the project with nodemon:

 `npm run start`

to build the project:

`npm run build`

to build the project, and run jasmine tests:

`npm run test`

to delete images in output folder (windows):

`npm run clear`

___
## End points:

Base: `localhost:3000`

## API:
uses `localhost:3000/api/`

on `404`: blocked due to `/*`

on `200`: returns route message.

### Images:
uses `localhost:3000/api/images`

on `200`: returns route message.
___
### Images parameters:
uses `localhost:3000/api/images?filename=[string]&width=[number]&height=[number]`

requires: `filename`, `width` and `height`.

on `200`: saves image under `images/output/*.jpg` or fetches it if exists under `images/output/` , returns an image.

on `404`: blocked due to:
- missing parameter names.
- missing parameter values.
- non-nummerical characters on `width` or `height`.
- extra parameters other than the requirement.

### ℹ️ output folder can contain multiple instances of the same image but with different dimensions.

___
### Test:
- multiple tests for index, validatiors, image creation.
- deletion of generated test image after testing.

