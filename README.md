## Description

This project is the mobile web frontend for the GrocerGo platform. It has been optimized specifically for mobile devices and may not render as intended on desktop devices due to the discrepancy in screen dimensions. For development purposes, run the project and use a browser to inspect it using the dimensions of an iPhone SE. For optimal viewing, access the running project from a mobile device.

&nbsp;

- **Backend**: https://github.com/zfc283/shopping-express

- **Project Demo**: https://www.grocergo.site (best viewed on a mobile device)
- **Test Account**:
  - Phone Number: 1234567890
  - Password: 111111a

&nbsp;

## Screenshots

&nbsp;

<img src="https://shopping-project.s3.ca-central-1.amazonaws.com/github-readme-images/Screenshot+(436).png" alt="Alt text" >

&nbsp;

&nbsp;

<img src="https://shopping-project.s3.ca-central-1.amazonaws.com/github-readme-images/Screenshot+(437).png" alt="Alt text" >

&nbsp;

&nbsp;

## Getting started

After cloning the project into local environment, navigate to the root directory of the project and execute the command `npm install`. This will initiate the download and installation of all necessary packages. Once the installation process is complete, launch the application by running `npm start`. The application can be accessed via `http://localhost:3000`. For development purposes, inspect the page using the dimensions of an iphone SE.

&nbsp;

Note that since the front-end makes HTTP requests to communicate with the back-end, if the back-end server is not running, errors will arise while interacting with the front-end. To resolve these issues, first clone the back-end project from `https://github.com/zfc12/shopping-express.git`. Then follow the instructions on the README page of the shopping-express project to properly configure Nginx. Next, ensure that the back-end is operational before initiating the front-end. Once everything is properly set up, the application can be accessed via `http://localhost:8080`.

&nbsp;
