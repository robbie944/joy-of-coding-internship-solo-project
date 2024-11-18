import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../src/db/database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify database connection
  db.query('SELECT 1', [], (err, results) => {
    if (err) {
      console.error('Database connection failed:', err);
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }
    console.log('Database connection successful:', results);
  });
  
  if (req.method === 'POST') {
    const { date, beginning_location, ending_location, total_miles, comment } = req.body;

    const query = 'INSERT INTO mileage_table (date, beginning_location, ending_location, total_miles, comment) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [date, beginning_location, ending_location, total_miles, comment], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        return;
      }
      // Log the results to verify successful insertion
      console.log('Insertion results:', results);
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
