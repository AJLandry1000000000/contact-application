# Interview Task

## Table of Contents
- [Overview](#overview)
- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)
- [Design decisions](#design-decisions)
- [Further improvements](#further-improvements)
- [Testing](#testing)


## Overview
Build a full-stack application where users can:

### :white_check_mark: Authentication: 
* Implement login & signup (JWT-based). (1-1.5 hrs)

### :white_check_mark: CRUD for Contacts:
* Users can create, view, update, and delete their own contacts. (2-3 hrs)

### :white_check_mark: Authorization: 
* Ensure users can only access their own contacts. (1 hr)

### :white_check_mark: Basic Error Handling:
* Validate input & return proper error messages. (0.5-1 hr)

## :hourglass_flowing_sand: Bonus (~2 Hours) – Choose One:
* Rate limiting (prevent abuse). (1 hr) <- I chose this bonus feature!
* Basic unit test for one critical API endpoint. (1 hr) <- I chose this bonus feature!
* API documentation (Swagger/Postman collection). (1-1.5 hrs)
* Support profile picture uploads for contacts (1-2hrs)

## Disclaimer
We don't expect the task to be completed 100%. This task is designed to get an idea of what you can accomplish within the given timeframe.
As long as you can justify your approach with sound technical reasoning, we're interested in seeing:
- Your problem-solving approach
- Code organization and structure
- Technical decision-making
- Implementation quality over quantity

Best of luck!

<!-- -------------------------------------------------------------------------------------------- -->

## Backend Installation
* `npm i` to install dependencies
* Sign up for a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
* Create a new cluster (you can use the free tier)
* Once your cluster is created, click "Connect" and choose "Connect your application"
* Copy the connection string URI provided
* Copy the `.env.sample` file to `.env`
* Add your MongoDB URI to the .env file
* for running the server you can use --> `npm start` or `npm run dev`
* it will run the server on port 4500

<!-- -------------------------------------------------------------------------------------------- -->

## Frontend Installation

* go to the frontend directory ---> cd client

* install all the dependencies by using --> npm i
* run `npm run dev` to start the local server
* it will run the server on --> http://localhost:3000

<!-- -------------------------------------------------------------------------------------------- -->


## Design decisions
- **Controller for Contact Model**: I created a controller for the Contact model with functions for creating, updating, viewing, and deleting contacts. This ensures that all CRUD operations are handled in a centralized file.
- **Input Validation**: I added input validation to the new Contact controller to ensure that all required fields are provided and in the correct format.
- **User Validation**: Implemented validation to ensure that the request is coming from the user who owns the contact being modified or requested. This helps maintain data integrity and security. This user validation is done on both the frontend and backend: 
    - In the frontend I display and allow modifications on only that users data. 
    - In the backend controllers I verify that the request is coming from the user (identified by their JWT) who is reading/modifying their own data.
- **Routes File**: I created a separate routes file for the Contact model to keep the routing logic organized and easily maintainable.
- **Rate Limiting**: For the bonus question I chose "rate limiting (prevent abuse)". I used `express-rate-limit` to create a rate limiter for all server endpoints. This helps prevent abuse and ensures fair usage of the API.
- **UI Components**: Developed UI components that allow users to perform CRUD operations on contacts through the frontend. Ensured that users can only view and modify their own contacts.
- **API Folder**: On the frontend project I moved all frontend API functions into an `api/` folder for better organization.
- **Popup Component**: Created a popup component to notify users of the outcome of CRUD operations. This provides immediate feedback to users, whether the operation was successful or if there was an error (e.g., users trying to create a contact with a number less than 10 digits will be notified of the issue and how to correct it).
- **Styling**: I added styling to my new frontend components. I focused on implementing the core functionality and logic over fancy styling. UI styling is important, but for the purposes of this exercise I chose to prioritise my technical solution and writing clean code.
- **Testing**: I decided to do a second bonus question, "basic unit test for one critical API endpoint". I added thorough testing of the `createContact()` methond from `server/controller/contact.js` using Jest. My tests are in the `__tests__/` folder. See the Testing section below for more information.


## Further improvements
- **Enhanced Error Handling**: Implement more comprehensive error handling to provide more informative error messages to the users.
- **Unit Testing**: Add unit tests for all critical components and API endpoints to ensure the reliability and stability of the application.
- **Documentation**: Create comprehensive documentation for the API endpoints, application architecture, and codebase to help future developers understand and contribute to the project.
- **Picture profile uploads**: Create functionality to allow users to upload photos connected to the contact. These photos would ideally be uploading to a technology like AWS S3 and saved in a unique path e.g. path could be `**userId**/**contactId**`
- **User Experience Improvements**: Improve the user interface and user experience by adding more interactive elements, better styling, and responsive design.


## Testing
I wrote unit tests for the `createContact()` methond in `server/controller/contact.js`. My tests cover the following scenarios:  
- Payload validation: Function should return 400 if userId is missing.
- Payload validation: Function should return 400 if name is missing.
- Payload validation: Function should return 400 if number is missing.
- Payload validation: Function should return 400 if address is missing.
- Payload validation: Function should return 400 if phone number is too small.
- Payload validation: Function should return 400 if phone number is not a number.
- User validation: Function should return 404 if user is not found. 
- User authorization: Function should return 403 if user is not authorized to modify that user's data. 
- Success validation: Function should return 200 if the contact already exists.
- Success validation: Function should return 200 if it can successfully create a new contact.
- Error validation: Function should return 500 if there is a server error.  
They ensure that the application behaves as expected under different conditions. Testing the other API endpoints would require similar unit tests.  
Run the tests using the following command:  `npm test`
