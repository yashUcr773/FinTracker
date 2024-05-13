import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
    plaidId: text("plaid_id")
})

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
    plaidId: text("plaid_id")
})

export const insertAccountsSchema = createInsertSchema(accounts)
export const insertCategoriesSchema = createInsertSchema(accounts)