import express from "express";
import { get } from "axios";
import cors from "cors";
const app = express();
const port = 8008;

app.use(cors());

async function fetch_data(url) {
  try {
    const response = await get(url);
    console.log("Response from", url, ":", response.data);
    if (response.status === 200 && Array.isArray(response.data.numbers)) {
      return response.data.numbers;
    }
  } catch (error) {
    console.error("Error fetching data from URL:", url, error.message);
  }
  return [];
}

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;
  const validUrls = Array.isArray(urls) ? urls : [urls];
  let mergedNumbers = [];
  const startTime = Date.now();

  for (const url of validUrls) {
    if (Date.now() - startTime > 500) {
      break;
    }
    fetch_data(url);
    try {
      const response = await get(url);
      if (response.status === 200 && Array.isArray(response.data.numbers)) {
        mergedNumbers = [
          ...new Set([...mergedNumbers, ...response.data.numbers]),
        ];
      }
    } catch (error) {
      console.error("Error fetching data from URL:", url);
    }
  }

  mergedNumbers.sort((a, b) => a - b);
  res.json({ numbers: mergedNumbers });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
