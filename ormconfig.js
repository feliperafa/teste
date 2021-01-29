
console.log("PROCESS.ENV.DATABASE_URL =>> ", process.env.DATABASE_URL)
module.exports = {

  "type": "postgres",
  "url": process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      "dist/app/models/*.js"
   ],
   "migrations": [
     "dist/app/database/migrations/*.js"
   ],
   "cli": {
     "migrationDir": "src/app/database/migrations/",
      "entitiesDir": "src/app/models"
   }
}