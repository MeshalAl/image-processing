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
___
## End points:

URL: `localhost:3000`

## API: `/api/`:
on `404`: blocked due to `/*`
on `200`: returns route message.

### Images `/api/images`:
on `200`: returns route message.
___
### Images parameters:
requires: `filename`, `width` and `height`.

on `200`: saves image under `images/output/*.jpg or fetches it if exists, returns an image.

on `404`: blocked due to:
- missing parameter names.
- missing parameter values.
- non-nummerical characters on `width` or `height`.
- extra parameters other than the requirement.

| :info:        | output folder can contain multiple instances of the same image but with different dimensions.     |
|---------------|:------------------------|