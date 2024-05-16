import { db } from "@/db/drizzle";
import { accounts, categories, transactions } from "@/db/schema";
import { calculatePercentChange, fillMissingDays } from "@/lib/utils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { differenceInDays, parse, subDays } from "date-fns";
import { and, desc, eq, gte, lt, lte, sql, sum } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
    .get('/',
        clerkMiddleware(),
        zValidator('query', z.object({
            to: z.string().optional(),
            from: z.string().optional(),
            accountId: z.string().optional()
        })),
        async (c) => {

            const auth = getAuth(c)
            const { from, to, accountId } = c.req.valid('query')

            if (!auth?.userId) {
                return c.json({ error: 'unauthorized' }, 401)
            }

            const defaultTo = new Date()
            const defaultFrom = subDays(defaultTo, 30)

            const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom
            const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo

            const periodLength = differenceInDays(endDate, startDate) + 1;
            const lastPeriodStart = subDays(startDate, periodLength)
            const lastPeriodEnd = subDays(endDate, periodLength)


            const [currentPeriod] = await fetchFinancialData(auth.userId, startDate, endDate, accountId)
            const [lastPeriod] = await fetchFinancialData(auth.userId, lastPeriodStart, lastPeriodEnd, accountId)

            const incomeChange = calculatePercentChange(currentPeriod.income, lastPeriod.income)
            const expensesChange = calculatePercentChange(currentPeriod.expenses, lastPeriod.expenses)
            const remainingChange = calculatePercentChange(currentPeriod.remaining, lastPeriod.remaining)

            const category = await db
                .select({ name: categories.name, value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number) })
                .from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .innerJoin(categories, eq(transactions.categoryId, categories.id))
                .where(and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    lt(transactions.amount, 0),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endDate),
                ))
                .groupBy(categories.name)
                .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`))

            const topCategories = category.slice(0, 3)
            const otherCategories = category.slice(3)
            const otherSum = otherCategories.reduce((sum, current) => sum + current.value, 0)
            const finalCategories = topCategories;

            if (otherCategories.length > 0) {
                finalCategories.push({ name: 'Others', value: otherSum })
            }

            const activeDays = await db
                .select({
                    date: transactions.date,
                    income: sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(Number),
                    expenses: sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(Number)
                }).from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endDate),
                ))
                .groupBy(transactions.date)
                .orderBy(transactions.date)

            const days = fillMissingDays(activeDays, startDate, endDate)

            return c.json({
                data: {
                    currentPeriod,
                    lastPeriod,
                    remainingAmount: currentPeriod.remaining,
                    remainingChange,
                    incomeAmount: currentPeriod.income,
                    incomeChange,
                    expensesAmount: currentPeriod.expenses,
                    expensesChange,
                    categories: finalCategories,
                    days
                }
            })
        }
    )

async function fetchFinancialData(userId: string, startDate: Date, endDate: Date, accountId: string | undefined) {
    return await db
        .select({
            income: sql`SUM(CASE WHEN ${transactions.amount} >=0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(Number),
            expenses: sql`SUM(CASE WHEN ${transactions.amount} <0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(Number),
            remaining: sum(transactions.amount).mapWith(Number)
        })
        .from(transactions).innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
        ))
}

export default app