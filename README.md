<img src="media/logo/ic_app.png" height="100px" />

Random Notes Server
=============

[![Travis CI](https://travis-ci.org/fartem/parse-test-server.svg?branch=master)](https://travis-ci.org/fartem/parse-test-server)
[![Codebeat](https://codebeat.co/badges/67b13aeb-4d1e-4fe2-b1ec-07d746983205)](https://codebeat.co/projects/github-com-fartem-parse-test-server-master)
[![Hits-of-Code](https://hitsofcode.com/github/fartem/parse-test-server)](https://hitsofcode.com/view/github/fartem/parse-test-server)
[![Android Arsenal](https://img.shields.io/badge/Android%20Arsenal-Android%20Parse%20Server%20Client-brightgreen.svg?style=flat)](https://android-arsenal.com/details/3/7906)

About
-------------

Test realization of Parse Server with [Android client](https://github.com/fartem/parse-android-test-app).

Configuration
-------------

Parse Server using variables from the OS environment. By default, all variables loaded from `.env` by `dotenv` in `server.js`.

__Variables__

| Variable  | Description |
| ------------- | ------------- |
| `SERVER_URL` | Server URL (combined with ADDRESS and PORT by default) |
| `PORT` | Server port |
| `APP_ID` | Application Id |
| `MASTER_KEY` | Master key |
| `CLIENT_KEY` | Client key |
| `DATABASE_URL` | Server DB URL |
| `APP_NAME` | Applicaiton name |
| `DATABASE_URL` | Database URL |
| `ADMIN_USER` | Parse Server Dashboard admin name |
| `ADMIN_PASSWORD` | Parse Server Dashboard admin password |
| `COMPOSE_PROJECT_NAME` | Docker Compose project name |
| `SITE_URL` | Docker Compose site URL |
| `MONGO_INITDB_DATABASE` | Docker Compose MongoDB initial database |

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

Nodemailer
-------------

Email Server using variables from the OS environment. By default, all variables loaded from `.env` by `dotenv` in `server.js`.

__Variables__

| Variable  | Description |
| ------------- | ------------- |
| `EMAIL_SEVER_HOST` | Email Server host |
| `EMAIL_SEVER_PORT` | Email Server port |
| `EMAIL_SEVER_SECURE` | Email Server secure status |
| `EMAIL_SEVER_USER` | Email Server user |
| `EMAIL_SEVER_PASSWORD` | Email Server password |

Run
-------------

Before start Parse Server run MongoDB from Docker:

```shell
docker-compose up
```

And then run Parse Server:
```shell
npm start
```

How to contribute
-------------

Read [Commit Convention](https://github.com/fartem/repository-rules/blob/master/commit-convention/COMMIT_CONVENTION.md). Make sure your build is green before you contribute your pull request. Then:

```shell
npm test
```

If you don't see any error messages, submit your pull request.

Contributors
-------------

* [@fartem](https://github.com/fartem) as Artem Fomchenkov
