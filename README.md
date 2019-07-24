 # parse-test-server

 Simple realization of Parse server with [mobile client-side](https://github.com/fartem/parse-android-test-app)

## 1. Install

Use guide on [this page](https://docs.parseplatform.org/parse-server/guide/) to install and run Parse

## 2. Parameters

- APP_ID: application id;
- CLIENT_KEY: application client key;
- MASTER_KEY: Parse master key;
- DATABASE_URI:  database URI.

## 3. Project structure

### 3.1 Configuration

If `server.js` file

### 3.2 Cloud functions

In `./cloud/` folder

## 4. Database entities

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

From Parse folder in a terminal: `npm start`

## 6. Dependencies

In `package.json`
