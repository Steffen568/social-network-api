const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'))

// set mongoose to connect to server when initiated
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true)

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));