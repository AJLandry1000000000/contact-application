# Interview Task
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
* Rate limiting (prevent abuse). (1 hr)
* Basic unit test for one critical API endpoint. (1 hr)
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




Mention I could have used react-model instead of building a custom modal.

Assumptions:
- Every contact: userId, name, number must be unique.