const express = require("express")
const path = require("path")
const fs = require("fs")
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 800;

// Defining Schema 
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String
});

// making a Model 
const Contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.status(200).render('home.pug')
});

app.get('/contact', (req, res) => {
  res.status(200).render('contact.pug')
});

app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("This item has been saved to the database")
  }).catch(() => {
    res.status(400).send("item was not saved to the databse")
  })
  // res.status(200).render('contact.pug')
});


//Start the server 
app.listen(port, () => {
  console.log(`The application started succesfully on part ${port}`)
})