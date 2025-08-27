import { defineConfig } from "drizzle-kit";
// import dotenv from 'dotenv'
// dotenv.config({path:".env.local"});
let host=process.env.DB_HOST! as string;
console.log("host",host);
export default defineConfig({
    schema:"./src/databaseSchema/schema.ts",
    out:"./drizzle",
    dialect:"mysql",
    dbCredentials:{
host:process.env.DB_HOST!,
password:process.env.DB_PASSWORD!,
database:process.env.DB_NAME!,
user:process.env.DB_USER!,
port:3306,
    }

});