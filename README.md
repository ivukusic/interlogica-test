# INTERLOGICA - TEST

## Description

This project contains two folder, one for backend and the other one for frontend app.

Backend part is built with NestJS. NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming)., and FRP (Functional Reactive Programming).

Frontend part is build with React in combination of Typescript. It is basically an app of one screen where you can find a form to upload CSV document with number. Example CVS document can be found in the root of this project.
When you upload a file, it is sent to API that parses the document and returns list of numbers with validation, changes and possible suggestions how some number can be updated. It's displayed in a table with pagination.


##### IMPORTANT - please paginate at least to page number 8 to see how suggestions look like when there are multiple suggestions

## Installation

Frontend and backed needs separate installation of packages. You have to go in each of the folders and run `yarn install`

```bash
yarn install
```

## Running the app

Like installation, to start the API you have to go to backend folder and run `yarn start` to start in development mode.

For frontend application, you have to open separate terminal window and also run `yarn start` inside od frontend folder.

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view frontend part in browser.

#### Swagger documentation

When you have successfully started the backend part you can see Swagger documentation on [http://localhost:3001/api](http://localhost:3001/api)
## Test

Both for frontend and backend, from each of its folder you can run following commands to run test.

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
