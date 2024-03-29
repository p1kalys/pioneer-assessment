# Pioneer Backend Project

An  API project designed to provide seamless user management, access to public API data, retrieve the Ethereum balance and protected routes with authentication.

## Tools
- Node.js
- Express.js
- Web3.js
- Zod
- Swagger.io
- MongoDB
  
## Swagger API Endpoints 
![image](https://github.com/p1kalys/pioneer-assessment/assets/85685112/7479bcac-98bd-4c4b-a067-9e900e824505)

Swagger Deployed Link - https://pioneer-assessment-gdi5.onrender.com/api-docs/

## Steps to run the code

- Clone the Repo - https://github.com/p1kalys/pioneer-assessment/
- Create a .env file and enter following details:
  - MONGO_URL
  - JWT_SECRET
  - infura_key
- Install the dependencies - `npm install`
- Run the command in terminal - `npm start`
- Open it in browser - `http://localhost:3000`
- Swagger docs available at -  `http://localhost:3000/api-docs`


## API Endpoints

### User Management
- **Register a New User**
  - Endpoint: `/user/register`
  - Method: POST
  - Description: Register a new user with username(email), and password.
  - Request Body:
    ```json
    {
      "username": "123@example.com",
      "password": "123456"
    }
    ```
  - Response:
    - `201`: New user registered successfully.
    - `400`: Email Already Exists.
    - `411`: Incorrect Inputs.

- **Login**
  - Endpoint: `/user/login`
  - Method: POST
  - Description: Log in with registered username and password.
  - Request Body:
    ```json
    {
      "email": "123@example.com",
      "password": "123456"
    }
    ```
  - Response:
    - `200`: Login successful. Returns JWT token.
    - `411`: Incorrect inputs.
    - `401`: Invalid Email/Password 
    - `404`: User not found.
      
- **Logout**
  - Endpoint: `/user/logout`
  - Method: POST
  - Description: Logout the user.
  - Response:
    - `203`: Logout successful.
    - `403`: Unauthorized.
    - `500`: Error while logging out.
   
### Public-API Data

- **Get List of Public APIs**
  - Endpoint: `/data`
  - Method: GET
  - Description: Retrieve a list of public APIs.
  - Query Parameters:
    - `category`: Filter APIs by category
    - `limit`: Number of items
  - Response:
    - `200`: Successful response with list of APIs.
    - `403`: Unauthorized.
    - `404`: No entries found for specified category.
    - `500`: Internal Server Error.
   
### Ethereum Balance

- **Get Ethereum Balance of wallet**
  - Endpoint: `/ether/balance`
  - Method: GET
  - Description: Retrieve the Ethereum balance from wallet.
  - Query Parameters:
    - `walletId`: Id of the particular wallet
  - Response:
    - `200`: Successful response with balance in wallet.
    - `403`: Unauthorized.
    - `500`: Internal server Error.
