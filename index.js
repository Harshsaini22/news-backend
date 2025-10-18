// index.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.get('/news', async (req, res) => {
  try {
    const { country = 'us', category = 'general', page = 1, pageSize = 10 } = req.query;
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=${pageSize}&page=${page}&token=${GNEWS_API_KEY}&lang=en`;
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
