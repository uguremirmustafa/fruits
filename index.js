import express from 'express';
import bodyParser from 'body-parser';
import { db, initDB } from './db.js';
import { sql } from './sqlStatements.js';

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.all(sql.getFruits, (err, rows) => {
    if (err) {
      return res.json({ message: 'sth went wrong' });
    }
    return res.json(rows);
  });
});

app.post('/', (req, res) => {
  if (req.body && req.body?.length) {
    const items = req.body.map((x) => x?.name).filter((x) => x);
    let placeholders = items.map((i) => '(?)').join(',');
    const q = sql.insertFruits(placeholders);
    db.run(q, items, (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          return res.json({ message: 'Fruit name must be unique' });
        }
        return res.json({ message: err.message });
      }
      return res.json({ message: `success: ${items.length} row(s) inserted` });
    });
  }
});

app.listen(port, () => {
  initDB();
  console.log(`http://localhost:${port}`);
});
