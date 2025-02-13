const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require("./routes/routes.js")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.use("/api", routes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

