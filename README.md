# Bionamic REST API
Includes the code for Bionamics REST API and client SDK 

#### Installation guide
1. Install [node.js](https://nodejs.org/en) at least version 20.8.0
2. Install [postgresql](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) at least version 13.12.0

#### Folder structure
```ts
project
|
|___src
    |
    |___database
    |
    |___scripts
    |
    |___utils
```
<br>

#### Scripts
##### Application scripts
Compiles the typescript code to javascript and outputs the code to dist folder in the root
```bash
npm run build
```
Starts the server. The script must be called after "npm run build" 
```bash
npm run start-server
```

<br>

##### Linter scripts
Triggers typescript to check for mismatched types
```bash
npm run check
```
Triggers rome to check mismatched formatting
```bash
npm run format-check
```
Triggers rome to fix mismatched formatting automatically
```bash
npm run format-apply
```

<br>

##### Database scripts
Creates database with given name
```bash
npm run create-database -- databaseName
```
Creates all required tables for given database
```bash
npm run create-schema -- databaseName
```
Inserts test data for given database
```bash
npm run populate-database -- databaseName
```
code: 
"create-database": "npx ts-node src/scripts/create-database.ts",
"create-schema": "npx ts-node src/scripts/create-schema.ts",
"populate-database": "npx ts-node src/scripts/populate-database.ts",
"intialize-database": "npx ts-node src/scripts/initalize-database.ts",
<br>

#### Startup
To start the server run the scripts below separately in same order
```bash
npm run build
npm run start
```