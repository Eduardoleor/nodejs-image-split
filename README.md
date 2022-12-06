# Nodejs with Express API 
## **Split image into cols and rows like a Puzzle**

This API splits an image columns and rows, receives an image and stores it in a virtual directory, after processing it returns it in base64 format and removes the record and directory

Why does it work like this?
My need was to create a puzzle game, however, I couldn't store images on the server and creating containers would take me more time, so I get the image from the client and process it on the server, I generate rows and columns and return the encrypted content, This is to avoid sending image-type files from one side to another, in addition to incorporating a user parameter that is a unique identifier so that the files are not mixed in its execution

### Parameters
1. Cols (example: 2)
2. Rows (example: 2)
3. User (example: uuid1234abc)
4. Image (example: Image.png)

### Request
* Type: POST
* Body: Form Data

## Express API Starter
How to use this template:

```sh
npx create-express-api --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Development

```
npm run dev
```
