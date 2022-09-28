# Italian-Politicians-Stats-On-Twitter

_Project of Web Programming, Design & Usability_

_Antonio Scardace @ Dept of Math and Computer Science, University of Catania_

## Introduction

The course aims to study and use useful technologies to build backend and frontend solutions. For instance, we have seen: HTML, CSS, and JavaScript for the Frontend; and NodeJS for the Backend.

This project was created as an exam project, to test and practice the following skills:
- Knowledge of HTML
- Knowledge of CSS
- Knowledge of JavaScript
- Knowledge of JQuery
- Knowledge of NodeJS
- Knowledge of ExpressJS
- Knowledge of JSON and REST APIs

## Real Use Case

The project aims to make stats about the use of Twitter by Italian Politicians of each coalition.

The statistics (about the last 24hs) that can be made for each Twitter Account and Political Coalition are:

- Average Number of Likes for Each Tweet.
- Average Number of Retweets for Each Tweet.
- Average Number of Replies for Each Tweet.
- Average Length (in characters) of a Tweet to understand who write more.

## Structure

The project contains **.env** that is a configuration file. <br/>
It contains some system variables which you can modify: 

- ``DB_HOST``: is the IP address of the database.
- ``DB_PORT``: is the Port to connect to the database.
- ``DB_USER``: is the Username to connect to the database.
- ``DB_PASSWORD``: is the Password to connect to the database.
- ``DB_NAME``: is the database Name. <br/>
- ``BEARER_TOKEN``: is the Token to fetch data by Twitter APIs.

## Getting Started

So that the repository is successfully cloned and project run smoothly, a few steps need to be followed.

### Requisites

- The use of [Visual Studio Code](https://code.visualstudio.com/Download) is strongly recommended.
- Need to have MySQL, if you don't have it anywhere, download and install it [from here](https://dev.mysql.com/downloads/installer/).
- Need to have a [Twitter Developer Account](https://developer.twitter.com/en/docs/developer-portal/overview).
- Need to have NPM and NodeJS.

### Installation for Developers

1. Clone the repository
```sh
   git clone https://github.com/ElephanZ/Italian-Politicians-Stats-On-Twitter.git
   cd YOUR_PATH/Italian-Politicians-Stats-On-Twitter/src/
   npm install
```  
2. Import database on MySQL
```sql
    USE italian_politics;
    SOURCE YOUR_PATH/Italian-Politicians-Stats-On-Twitter/src/db/schema.sql;
    SOURCE YOUR_PATH/Italian-Politicians-Stats-On-Twitter/src/db/data.sql;
```
3. Configure ``.env`` config file.
4. Run the server
```sh
    node server.js
```

## License :copyright:

Author: [Antonio Scardace](https://antonioscardace.altervista.org/). <br/>
See ``LICENSE`` for more information.
