const config = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRoutes');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const certificatePath = path.join(__dirname, process.env.CERT_PATH);
const uri = process.env.DB_URI;

const options = {
    tlsCertificateKeyFile : certificatePath
};

mongoose.connect (uri, options);

const db = mongoose.connection;

db.once('open', () => {
    console.log ('Connected to Mongo DB');
});

db.on('error' , (error) => {
    console.error(error);
    process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use (cors());

app.use(express.json());

app.use('/tasks', taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

