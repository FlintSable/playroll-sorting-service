import express from "express";
import cors from "cors";
import { ContentItem } from "./types";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/sort", (req, res) => {
  console.log("Received sort request");
  console.log("Request body:", req.body);
  try {
    const { action, data } = req.body;
    const { items, ascending = true } = data;
    let sortedItems: ContentItem[];

    switch (action) {
      case "sortByName":
        sortedItems = [...items].sort((a, b) => {
          const comparison = a.title.localeCompare(b.title);
          return ascending ? comparison : -comparison;
        });
        break;

      case "sortByType":
        sortedItems = [...items].sort((a, b) => {
          const comparison = a.type.localeCompare(b.type);
          return ascending ? comparison : -comparison;
        });
        break;

      default:
        return res.status(400).json({ error: "Invalid sort action" });
    }

    res.json({ items: sortedItems });
  } catch (error) {
    res.status(500).json({ error: "Sorting failed" });
  }
});

app.listen(port, () => {
  console.log(`Sorting service running on port ${port}`);
});
