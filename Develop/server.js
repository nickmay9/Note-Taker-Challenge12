const express = require('express');
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`);
})