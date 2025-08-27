import {int,mysqlTable,varchar,timestamp } from "drizzle-orm/mysql-core";





export const users=mysqlTable("users",{
    id:int("id").primaryKey().autoincrement().notNull(),
    name:varchar("name",{length:50}).notNull(),
    email:varchar("email",{length:100}).notNull().unique(),
    password:varchar("password",{length:255}).notNull(),
    age:int("age"),
    createdAt:timestamp("createdAt").defaultNow().notNull(),
});

export const todo=mysqlTable("todo",{
    id:int("id").primaryKey().autoincrement().notNull(),
    title:varchar("title",{length:255}).notNull(),
    email:varchar("email",{length:100}).notNull(),
    createdAt:timestamp("createdAt").defaultNow().notNull(),
});