**Make a Project Directory with the following structure:**

e-cube-web-application/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── LatestMoviesList.js
│   │   ├── EventsList.js
│   │   ├── BookingPage.js
│   │   ├── SearchBar.js
│   │   ├── LatestMoviesList.css
│   │   ├── EventsList.css
│   │   ├── BookingPage.css
│   │   ├── SearchBar.css
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   
│   ├── package.json
|   ├── package-lock.json
│   └── /node_modules
|── server/
|   ├── server.js
|   ├── package.json
|   ├── package-lock.json
|   |── README.md
|   ├── /node_modules
|   └── /public/images -- (contains all the images)

**Navigate to the Client Directory**
>> cd e-cube-web-application/client

**Create a new React application**
>>npx create-react-app .

**Install axios for making HTTP requests:**
>> npm install axios

**Install react-router-dom for routing:**
>> npm install react-router-dom

**Navigate to Server Directory(Backend):**
>> cd e-cube-web-application/server
>> npm init -y

**Install the required packages to fecth data from MongoDB Database:**
>> npm install express mongoose cors

**Note: All the necessary files like src/App.js, src/LatestMoviesList.js, etc for frontend and server/server.js for backend are updated as .zip files and uploaded in the LMS.**

**Now navigate to server directory, open Command Prompt and run:**
>> node server.js

**Also navigate to client directory, open Command Prompt and and run:**
>> npm start

*N.B. This will start the development server and display the e-cube ticket booking application.*

                     -------------------------------------------------------

