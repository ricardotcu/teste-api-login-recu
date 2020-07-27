module.export = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": {
       "rejectUnauthorized": false
    },
    "logging": true,
    "entities": [
       "dist/entity/**/*.js"
    ],
    "migrations": [
       "dist/migration/**/*.js"
    ],
    "subscribers": [
       "dist/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }