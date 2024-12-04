# Role-Based-Authentication-System
Authentication the user using the Role-Based Access Control(RBAC). And hashing the password before it store to the database.
Can be able to registration, login, and reset of password with validation of input.

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
3. Create a .env file and put the `PORT`, `JWT_SERECT` and `CONNECTION_STRING`
4. Create a new MongoDB database and replace the `MONGO_URI` or use docker to create a Mongo image
5. Run the application by executing `node index.js` in the terminal or run `npm run dev`

## Execution
- Register the user with the JWT sign and hash password
![alt text](image.png)

- Database saved in MongoDB
![alt text](image-2.png)

- Error regitrstions
  <img width="791" alt="postman-err-r1" src="https://github.com/user-attachments/assets/dd50cf72-c41b-4f4b-a1f5-1c3ce2c11e0e">

- Login user
![alt text](image-1.png)

- Role Access code -> use token to authenticate the user
![alt text](image-3.png)