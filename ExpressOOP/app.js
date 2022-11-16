const express = require('express');
const app = express();
const port = 4000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const heroController = require('./routers/hero_controllers')
app.use('/hero', heroController)

app.get('/', (req, res) => {
    res.send(`check out our OOP!`) 
})

app.listen(port, () => {
    console.log(`Listening to that sweet gundam noise on port ${port}`);
})

module.exports = app;