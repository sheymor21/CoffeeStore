# Coffee Store

## Description

This project is a Coffee Store application built using Node.js and Express. It utilizes Mongoose for database
interactions and Joi for schema validations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Prerequisites

If you don't have npm installed, you need to install Node.js, which includes npm. You can download it
from [here](https://nodejs.org/).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sheymor21/coffee-store.git
    cd coffee-store
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Create a `.env` file in the root directory and add your environment variables.
2. Start the application:
    ```bash
    npm start
    ```

## Environment Variables

The following environment variables are used in this project:

- `MONGO_USER`: Username for MongoDB authentication
- `MONGO_PASS`: Password for MongoDB authentication
- `MONGO_DBNAME`: Name of the MongoDB database
- `MONGO_URI`: MongoDB connection string
- `PORT`: The port on which the server will run

## Swagger Documentation

This project uses Swagger for API documentation. You can view the API documentation at the following endpoint:

- **/api/api-docs**: Access the Swagger UI for detailed API documentation and testing.

## API Endpoints

- **GET /api/coffees**: Get a list of all coffee products.
- **POST /api/coffees**: Add a new coffee product. (Requires JSON body with product details)
- **PUT /api/coffees/:id**: Update details of a specific coffee product by ID. (Requires JSON body with updated product
  details)
- **DELETE /api/coffees/:id**: Delete a specific coffee product by ID.
- **GET /api/orders**: Get a list of all orders.
- **POST /api/orders**: Create a new order. (Requires JSON body with order details)
- **PUT /api/orders/:id**: Update details of a specific order by ID. (Requires JSON body with updated order details)
- **DELETE /api/orders/:id**: Delete a specific order by ID.
- **POST /api/orders/items/:id**: Add more items for an existing order By order ID
- **DELETE /api/orders/items/:id**: Delete a specific item from an order by ID.
- **PUT /api/orders/items/:id**: Update details of a specific item in an order by ID. (Requires JSON body
  with updated item details)
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
