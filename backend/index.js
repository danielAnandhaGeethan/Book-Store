const express = require("express");
const app = express();
const { PORT, mongoDBUrl } = require("./config");
const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());
/*app.use(
  cors({
    origin: "https:localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);*/

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To the app.");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
