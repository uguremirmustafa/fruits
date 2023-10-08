import sqlite3 from 'sqlite3';
import { sql } from './sqlStatements.js';

export const db = new sqlite3.Database('./fruits.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the fruits database.');
});

export function initDB() {
  db.serialize(() => {
    db.exec(sql.createFruitsTable, (err) => {
      if (err) console.log(err.message);
    });
  });
}
