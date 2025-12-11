const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const moviesRoutes = require("./routes/moviesRoutes");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/movies", moviesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));