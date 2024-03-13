import { defineDb, defineTable, column } from 'astro:db';

const Visits = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    page: column.text({ default: 'home' }),
    content: column.text({ default: "none" }),
    pagination: column.number({ default: 1 }),
    visitor_ip_hash: column.text(),
    visitor_user_agent_hash: column.text(),
    visitor_count: column.number({ default: 1 })
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Visits }
});
