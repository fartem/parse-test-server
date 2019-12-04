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

In `server.js`:

| Name  | Description |
| ------------- | ------------- |
| `PORT` | Server port |
| `ADDRESS` | Server address |
| `SERVER_URL` | Server URL (combined with ADDRESS and PORT by default) |
| `APP_ID` | Application Id |
| `MASTER_KEY` | Master key |
| `CLIENT_KEY` | Client key |
| `DATABASE_URL` | Server DB URL |
| `APP_NAME` | Applicaiton name |

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

From Parse folder in a terminal:
```shell
npm start
```
