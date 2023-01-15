# IMMO Inc. Server

This project is the server-side implementation for IMMO Inc.'s admin dashboard. It provides the API endpoints for the dashboard to interact with the database.

## Technologies utilized

* NodeJs
* ExpressJs
* MongoDB
* JWT
* All dependencies can be found in the package.json file.

## Getting started

* Make sure you have Node.js installed on your machine before running the project
* The client side of this project is available in a separate repository, please refer to the following link to get the client implementation: https://github.com/Julesdj/immo-admin.git

## Installation

* Clone the repository: `https://github.com/Julesdj/immo-server.git`
* Install the dependencies: `npm install`
* Create a file named `.env` and copy-paste the `.env.example` file
* Start the server: `npm run dev`

## API Endpoints

* `POST /api/auth` - Authenticate the user
* `GET /api/products` - Retrieve a list of all products
* `GET /api/products/stats` - Retrieve a list of all products with stats
* `GET /api/sales` - Retrieve a list of all sales
* `GET /api/management/admins` - Retrieve a list of all administrators
* `GET /api/management/performances/:id` - Retrieve a user's performances over time
* `GET /api/client/geography` - Retrieve users by location
* `GET /api/client/transactions` - Retrieve a user's transactions over time

## Contribution

If you would like to contribute to this project, please fork the repository and make a pull request. We welcome any contributions to improve the functionality of the server.
