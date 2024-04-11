## Description

This project is the mobile front-end for the GrocerGo platform. It has been optimized specifically for mobile devices and may not render as intended on desktop devices due to the discrepancy in screen dimensions. For optimal viewing, it is recommended to run the project and then use a browser to inspect it under the dimensions of an iPhone SE.

## Getting started

Upon successfully cloning the project into local environment, navigate to the root directory of the project and execute the command "npm install". This will initiate the download and installation of all necessary packages. Once the installation process is complete, launch the application by running "npm start". To access the application, open [http://localhost:3000] in your browser. For optimal viewing, remember to inspect the page using the dimensions of a mobile device.

Note that since the front-end makes HTTP requests to communicate with the back-end, if the back-end server is not running, errors will arise while interacting with the front-end. To resolve these issues, first clone the back-end project from https://github.com/zfc12/shopping-express.git. Then follow the instructions on the README page of the shopping-express project to properly configure Nginx. Next, ensure that the back-end is operational before initiating the front-end. Once everything is correctly set up, the application can be accessed via [http://localhost:8080].
