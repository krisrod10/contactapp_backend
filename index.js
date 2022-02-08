let express = require("express");
require('dotenv').config();
let cors = require('cors');
let app = express();

app.use(cors());

// Add functionality to parse json body
app.use(express.json());

let port = process.env.PORT;

app.get('/', (req,res) => {
    res.send("I am connected");
})

app.listen(port, () => {
    console.log("Listening on port", port);
})