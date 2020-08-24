const express = require('express');
const app = express();
const path = require('path');
const arrFromFront = require('./public/js/map');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs')

app.get('/', (req, res) =>{
  res.render('welcome')
})

app.get('/map', (req, res) =>{
  console.log(arrFromFront);
  res.render('index')
})

app.get('/form', (req, res) =>{
  res.render('form')
})

app.post('/new', (req, res) =>{
  const { reply } = req.body;   
  console.log(`Message from user:${ reply }`);
  res.redirect('thanks')
})

app.get('/thanks', (req, res) =>{
  res.render('thanks')
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening port ${port}!`);
});



