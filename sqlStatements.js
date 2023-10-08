export const sql = {
  createFruitsTable: `
    CREATE TABLE IF NOT EXISTS fruits (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    );
    `,
  getFruits: `
        SELECT * from fruits;
    `,
  insertFruits: (parameters) => `
      INSERT INTO fruits(name) VALUES ${parameters}
    `,
};
