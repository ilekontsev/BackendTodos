const express = require('express');
const cors = require('cors')
const todosRouter = require('./routes/todosRouter')
const mongoose = require('mongoose')

const port = 3000;
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
  useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
}).catch((err) => {
  console.log(444, err)
})

app.use('/', todosRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});