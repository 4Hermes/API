# Architecture

This file provides information on the architecture/structure of the Hermes-API, which is what this repository is home to.

## Folders

The following table provides information on the folders used in the project, note that a column with an asterisk (\*) means it is required:

```text
.
├── ./interfaces/
│   ├── ./interfaces/check-in
│   └── ./interfaces/db
├── ./lib/
│   ├── ./lib/bases
│   ├── ./lib/constants
│   ├── ./lib/schemas
│   ├── ./lib/utils
│   └── ./lib/validators
├── ./routes
├── ./services
└── ./validators
```

| Folder Name*                | Description*                                                                                     | Example (Optional)                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `./src/interfaces`          | Where I store all the files that export interfaces & enums.                                      | _N/A_                                                                                       |
| `./src/interfaces/check-in` | Where I store all the interfaces related to a Check-In.                                          | _N/A_                                                                                       |
| `./src/interfaces/db`       | Where I store all the interfaces related to interacting with the MongoDB Cluster.                | _N/A_                                                                                       |
| `./src/lib`                 | Where I store all the helper code that doesn't belong in any of the other top-level directories. | _N/A_                                                                                       |
| `./src/lib/bases`           | Contains all the classes to use as the base of another class.                                    | The `BaseRoute` class is what all of my Route classes (in `./src/routes`) extend.           |
| `./src/lib/constants`       | Where I store all the files that export values that are used throughout the application.         | The format used (`LAST_CONTACT_FORMAT`) for the `lastContact` property of a Friend object.  |
| `./src/lib/schemas`         | Where I store all the files to be used by the `Joi` package to validate data.                    |                                                                                             |
| `./src/lib/utils`           | Where classes that serve a specific utility are stored.                                          | The `DBUtil` class exports functions for interacting with the MongoDB Cluster.              |
| `./src/lib/validators`      | Where I store all the code related to validating user input with the [ajv][0] package.           |                                                                                             |
| `./src/routes`              | Where I store the files that are registered as routes with the API.                              | _N/A_                                                                                       |
| `./src/services`            | Where I store the files that serve as a "back-end" of the available routes.                      | The `CheckInService` class for performing the actual work necessary for a Check-In request. |

## Dependencies

This note provides information on the dependencies that are used by the Hermes API.

> NOTE: It's important to note that the versions used in the following examples may not be the version used after some time. To get the latest version, please check the `package.json` file._

### Prod Dependencies

This section provides information on the "Prod" dependencies, which are dependencies that are always installed.

```json
"dependencies": {
  "@4lch4/koa-oto": "^2.0.0",
  "@4lch4/koa-router-printer": "^1.4.3",
  "@4lch4/logger": "^1.11.0",
  "@koa/router": "^12.0.0",
  "ajv": "^8.11.2",
  "dayjs": "^1.11.7",
  "joi": "^17.7.0",
  "koa": "^2.14.1",
  "koa-body": "^6.0.1",
  "koa-helmet": "^6.1.0",
  "mongodb": "^4.13.0"
}
```

### Dev Dependencies

This section provides information on the "Dev" dependencies, which are dependencies that are only installed when the `--dev` flag is used.

```json
"devDependencies": {
  "@types/koa": "^2.13.5",
  "@types/koa__router": "^12.0.0",
  "@types/node": "^17.0.12",
  "prettier": "^2.8.1",
  "snyk": "^1.1076.0",
  "typescript": "^4.9.4"
}
```

## Environment Variables

The following table provides details on the various environment variables that the Hermes API is expecting to have values and what they're for.

> NOTE: Any column with an asterisk (`*`) in the header (e.g. **Description***) means that column **must** have a value.

| Variable Name\*                    | Description\*                                                           | Default   | Example                                                                        | Required |
| ---------------------------------- | ----------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------ | -------- |
| API_PREFIX                         | The prefix to append before all routes registered with the API.         | `/api/v1` | **N/A**                                                                        | false    |
| API_TOKEN                          | The token used to authenticate requests to the API while in alpha/beta. | **N/A**   | `gibberish,gibberish,gibberish,gibberish,gibberish`                            | true     |
| DEBUG                              | Can be set to true and enable extra logging.                            | `false`   | **N/A**                                                                        | false    |
| DOCKER_IMAGE_NAME                  | The name of the Docker image to build/run.                              | **N/A**   | `4lch4/hermes-api`                                                             | true     |
| DOCKER_CONTAINER_NAME              | The name of the container where the API will run.                       | **N/A**   | `hermes-api`                                                                   | true     |
| DOCKER_VERSION_TAG                 | The version number string to tag the Docker Image with.                 | `v0.0.0`  | `v0.1.7`                                                                       | true     |
| MONGODB_CONNECTION_STRING          | The connection string used to connect to the MongoDB Cluster.           | **N/A**   | `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER_URL}` | true     |
| MONGODB_CONFIG_COLLECTION_NAME     | The name of the collection where app config data is stored.             | `conf`    | **N/A**                                                                        | true     |
| MONGODB_CONFIG_COLLECTION_DB_NAME  | The name of the database containing the `config` collection.            | `hermes`  | **N/A**                                                                        | true     |
| MONGODB_FRIENDS_COLLECTION_NAME    | The name of the collection where all Friend objects are stored.         | `friends` | **N/A**                                                                        | true     |
| MONGODB_FRIENDS_COLLECTION_DB_NAME | The name of the database containing the `friends` collection.           | `hermes`  | **N/A**                                                                        | true     |
| MONGODB_USERS_COLLECTION_NAME      | The name of the collection where all User objects are stored.           | `users`   | **N/A**                                                                        | true     |
| MONGODB_USERS_COLLECTION_DB_NAME   | The name of the database containing the `users` collection.             | `hermes`  | **N/A**                                                                        | true     |

[0]: https://ajv.js.org
