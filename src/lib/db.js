
import mysql from "mysql2/promise";
import * as schema from '@/databaseSchema/schema'
import { drizzle } from "drizzle-orm/mysql2";

let pool=await mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  }); 
  export const  db=drizzle(pool,{schema,mode:"default"})
  
