const express = require("express");
const cors = require("cors");
const { ObjectId, MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(
  "mongodb+srv://db_users:rOojXTqXPuSZfAPE@cluster0.l1qze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

async function run() {
  try {
    // await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("suppliedatabase");
    const suppliesCollections = db.collection("supplies");

    // get all supplies data
    app.get("/supplies", async (req, res) => {
      const supplydata = await suppliesCollections.find({}).toArray();
      res.send(supplydata);
    });
    // post supplies data
    app.post("/supplies", async (req, res) => {
      try {
        const suppliesData = req.body;
        const result = await suppliesCollections.insertOne(suppliesData);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
    // // get single supplies
    app.get("/supplies/:id", async (req, res) => {
      const id = req.params.id;
      const result = await suppliesCollections.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    // // delete
    app.delete("/supplies/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await suppliesCollections.deleteOne({
          _id: new ObjectId(id),
        });
        res.json(result);
      } catch (error) {
        console.error("Error deleting supply:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // update data

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1);
  }
}

run();

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
