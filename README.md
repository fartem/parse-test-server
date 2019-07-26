# parse-test-server

Simple realization of Parse server with [mobile client](https://github.com/fartem/parse-android-test-app).

## 1. Install

Use guide on [this page](https://docs.parseplatform.org/parse-server/guide/) to install and run Parse server.

## 2. Parameters

__Values for working with this server:__

| Name  | Description |
| ------------- | ------------- |
| APP_ID | application id |
| CLIENT_KEY | application client key |
| MASTER_KEY | Parse master key |
| DATABASE_URI | database URI |

## 3. Project structure

### 3.1 Server

`server.js` - server configuration and runner.

### 3.2 Cloud functions

In `./cloud/main.js` file. Contains triggers for all project entities.

## 4. Database entities

This section contains information about custom tables. `User` and `Role` table saved from basic configuration.

### 4.1 Note

| Column | Type | Description |
| --- | --- | --- |
| objectId | `String` | Default Parse column |
| createdAt | `Date` | Default Parse column |
| updatedAt | `Date` | Default Parse column |
| ACL | `ACL` | Default Parse column |
| title | `String` | Note title |
| subtitle | `String` | Note subtitle |
| note_id | `Number` | Note id in local database |

## 5. Run

From Parse folder in a terminal: `npm start`.

## 6. Dependencies

In `package.json`.
