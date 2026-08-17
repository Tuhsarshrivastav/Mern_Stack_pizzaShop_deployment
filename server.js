const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

// config dotenv
dotenv.config();

// connection mongodb
connectDB();

const app = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Node server");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${port}`
      .bgMagenta.white
  );
});
