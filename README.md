[![Build Status](https://travis-ci.org/andela-nekekwe/docMan.svg?branch=develop)](https://travis-ci.org/andela-nekekwe/docMan)
[![Coverage Status](https://coveralls.io/repos/github/andela-nekekwe/docMan/badge.svg?branch=develop)](https://coveralls.io/github/andela-nekekwe/docMan?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-nekekwe/docMan/badges/gpa.svg)](https://codeclimate.com/github/andela-nekekwe/docMan)

# DOCUMENT MANAGEMENT SYSTEM 

About the Application
-------------
Document Management System, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. 
Also, each document specifies the date it was published.

Tech Stack
--------------
* [React] - A javascript library for building user interfaces
* [Redux] - A predictable state container for JavaScript apps.
* [Enzyme] - A JavaScript Testing utility for React
* [Materialize] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack] - the streaming build system
* [Sequelize] - Sequelize is a promise-based ORM for Node.js and io.js.
* [JWT] - To authenticate routes
* [Postgresql and Sequelize ORM]

Local Development
--------------
Document Mnagement System requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd docMan
$ npm install -d
$ node app
$ Create Postgresql database and run migrations npm run db:setup.
$ Start the express server npm start.
$ Run test npm test.
```


Postman Collection
--------------

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2bbeeaa6b317239f5cdd)

Create a Postman environment and set url and token variables or download and import a production environment from this 




API Documentation
-----------------
The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

## Authentication

Users are assigned a token when their accounts are created or they login to the system.This token is needed for subsequent HTTP requests to the API for authentication. API requests made without authentication will fail with the status code 401: Unauthorized.

The following are some sample request and response form the API.




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

