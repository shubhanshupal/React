const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
})
app.post('/', (req, res) => {
    res.send('Welcome to the Home Page with Post request!');
})

app.get('/about', (req, res) => {
    res.send('Welcome to the About Page!');
})

app.get('/profile', (req, res) => {
    res.send(`Welcome to the Profile Page, ${(req.query.name)?req.query.name:''}!`);
})

app.listen(8001, () => {
    console.log('Express server is running on port 8001');
});