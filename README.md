# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Title

Free recipe

## Description

This website offers free recipes for people who likes to do cook, users can brower the website without registering, users can search free recipes by selecting categories or area or ingredients; Meanwhile, as a registered user, you can save or unsave a recipe, or create your own recipe.

## Recipe Features

### Search recipes by categories

Users can find recipes by selecting categories, such as beef, chicken, breakfast, dessert etc.
This feature is implemented by selecting a category option from a categories select

### Search recipes by area

Users can find recipes by selecting area, such as American, British, Chinese etc.
This feature is implement by selecting an area option from an area select

### Search recipes by ingredients

Users can manually enter a main ingredient and search the recipes that includes this ingredient

The above three searching methods cover all recipes from API, they take care of different preferences.
Users have access to all searching routes without registering.

## User Features

### Save a recipe

A login user can save a recipe in his/her profile for future reference

### Create a recipe

A login user can create a recipe and save in his/her profile

### Edit profile
A registered user can edit his/her own profile while logined, including saving/creating/deleting a recipe

This feature benefits users in a way to build and manage their own recipe library.

## Running Test

Tests are written using Jest, so far this app includes backend test, which are store in models folder and routes folder in github backend repo [https://github.com/joannadeng/49.capstone-project-backend]

`npm run test`

## Standard User Flow

### Regular user

When open the website, click on the signup button on top of the homepage and finish the registeration. 
After successfully registered/logined, feel free to explore the app, user has access to all features you can see from website.

### Admin

Except for the regular user features, Admin can manage users by editing user's profile, or deleting a user in Admin's profile.

## Technology Stack

### Backend

Node Express
PostgreSQL
pg
Jsonschema
Jsonwebtoken
axios
bcrypt
Jest
request

### Frontend

Creat React App
axios
formik
jwt-decode
react
react-dom
react-router-dom
react-scripts
CSS