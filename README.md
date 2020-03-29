<img src="media/logo/ic_app.png" height="100px" />

Random Notes Server
=============

[![Build Status](https://travis-ci.org/fartem/parse-test-server.svg?branch=master)](https://travis-ci.org/fartem/parse-test-server)
[![Android Arsenal](https://img.shields.io/badge/Android%20Arsenal-Android%20Parse%20Server%20Client-brightgreen.svg?style=flat)](https://android-arsenal.com/details/3/7906)
![Open issues](https://img.shields.io/github/issues-raw/fartem/parse-test-server.svg?color=ff534a)

About
-------------

Simple realization of Parse Server with [mobile client](https://github.com/fartem/parse-android-test-app).

__Install__
-------------

Use guide on [this page](https://docs.parseplatform.org/parse-server/guide/) to install and run Parse Server.

__Configuration__
-------------

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

Database entities
-------------

__Note__

| Column | Type | Description |
| --- | --- | --- |
| objectId | `String` | Default Parse column |
| createdAt | `Date` | Default Parse column |
| updatedAt | `Date` | Default Parse column |
| ACL | `ACL` | Default Parse column |
| title | `String` | Note title |
| subtitle | `String` | Note subtitle |
| note_id | `Number` | Note id in local database |

Nodemailer
-------------

Configuration file: `src/utils/email/email.js`

Change empty fields with specific values of your email server.

Run
-------------

From Parse folder in a terminal:
```shell
npm start
```

Contributors
-------------

* [@fartem](https://github.com/fartem) as Artem Fomchenkov