This week is divided into three parts for assignments - 

## Middlewares
 - You have to create a few standard middlewares for your application. Create a middlewares for 
    - [x] logging the number of requests on a server
    - [x] rate limiting a users request based on their username passed in the header
    - [x] logging the number of errors on a server
 - To test, go to the 01-middlewares folder and run `npx jest ./tests`
 
## JWTs
 - [x] Write a function that takes in a username and password and returns a JWT token with the username encoded. Should return null if the username is not a valid email or if the password is less than 6 characters. Try using the zod library here
 - [x] Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise
 - [x] Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise
 - [x] To test, go to the 02-jwt folder and run `npx jest ./tests`

## Databases