const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Supply = require("./model/supplyes");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    // code start

    // get all supplies data
    app.get("/supplies", async (req, res) => {
      try {
        const supplydata = await Supply.find({});
        res.send(supplydata);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
    // post supplies data
    app.post("/supplies", async (req, res) => {
      try {
        const suppliesData = req.body;
        const result = await Supply.create(suppliesData);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
    // get single supplies
    app.get("/supplies/:id", async (req, res) => {
      const id = req.params.id;
      const result = await Supply.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // delete 
    app.delete("/supplies/:id", async (req, res) => {
      try {
        const id = req.params.id;
        // if (!ObjectId.isValid(id)) {
        //   return res.status(400).json({ error: "Invalid ID format" });
        // }
        const result = await Supply.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
      } catch (error) {
        console.error("Error deleting supply:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // update data 
    // app.put("/supplies/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const updatedData = req.body; // Updated data for the supply

    //     // Update the supply in the database
    //     const result = await Supply.updateOne(
    //       { _id: new ObjectId(id) },
    //       { $set: updatedData }
    //     );

    //     if (result.modifiedCount === 0) {
    //       return res.status(404).json({ error: "Supply not found" });
    //     }
    //     res.status(200).json({ message: "Supply updated successfully" });
    //   } catch (error) {
    //     console.error("Error updating supply:", error);
    //     res.status(500).json({ error: "Internal server error" });
    //   }
    // });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

run().catch(console.error);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
