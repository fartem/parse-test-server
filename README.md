<img src="media/ic_app.png" height="100px" />

![Open issues](https://img.shields.io/github/issues-raw/fartem/parse-test-server.svg?color=ff534a&style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/fartem/parse-test-server.svg?color=51539c&style=flat-square)
![Repo size](https://img.shields.io/github/repo-size/fartem/parse-test-server.svg?color=02778b&style=flat-square)
[![License](https://img.shields.io/github/license/fartem/parse-test-server.svg?color=7ea4b0&style=flat-square)](https://github.com/fartem/parse-test-server/blob/master/LICENSE)

## About

Simple realization of Parse server with [mobile client](https://github.com/fartem/parse-android-test-app).

## Install

Use guide on [this page](https://docs.parseplatform.org/parse-server/guide/) to install and run Parse server.

## Parameters

__Values for working with this server:__

| Name  | Description |
| ------------- | ------------- |
| APP_ID | application id |
| CLIENT_KEY | application client key |
| MASTER_KEY | Parse master key |
| DATABASE_URI | database URI |

## Project structure

### Server

`server.js` - server runner. Contains server configuration (address, port, etc.).

### Cloud functions

In `./cloud/main.js` file. Contains triggers for all project entities.

## Database entities

This section contains information about custom tables. `User` and `Role` table saved from basic configuration.

### Note

| Column | Type | Description |
| --- | --- | --- |
| objectId | `String` | Default Parse column |
| createdAt | `Date` | Default Parse column |
| updatedAt | `Date` | Default Parse column |
| ACL | `ACL` | Default Parse column |
| title | `String` | Note title |
| subtitle | `String` | Note subtitle |
| note_id | `Number` | Note id in local database |

## Run

From Parse folder in a terminal: `npm start`.
