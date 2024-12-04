# Role-Based-Authentication-System
Authenticating the user using Role-Based Access Control(RBAC) and hashing the password before it is stored in the database.
Can be able to register, login, and reset of passwords with validation of input.

## Tech Stack used
- JavaScript
- NodeJs
- Express Js 
- Jsonwebtoken
- Bcrypt
- MongoDB
- zod
- Docker

## Steps to execute
1. Clone the repository
2. Install the required packages by running `npm install` in the terminal
3. Create a .env file and put the `PORT`, `JWT_SERECT`, and `CONNECTION_STRING`
4. Create a new MongoDB database or use docker to create a Mongo image and replace the `CONNECTION_STRING`
5. Run the application by executing `node index.js` in the terminal or run `npm run dev`
6. Run the role-based authentication using the barear token get after login or registration to access the particular role.

## Execution
- Register the user with the JWT sign and hash password
![alt text](image.png)

- Database saved in MongoDB
![alt text](image-2.png)

- Error registrations
  <img width="791" alt="postman-err-r1" src="https://github.com/user-attachments/assets/dd50cf72-c41b-4f4b-a1f5-1c3ce2c11e0e">

- Login user
![alt text](image-1.png)

- Role Access code -> use token to authenticate the user
![alt text](image-3.png)
