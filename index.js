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

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const contactRoutes = require('./routes/contacts');
app.use(contactRoutes);

const usersRoutes = require('./routes/users');
app.use(usersRoutes);



app.listen(port, () => {
    console.log("Listening on port", port);
})