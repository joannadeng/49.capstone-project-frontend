
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
