const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
var serialize = require('form-serialize');
var db;
// urlencoded tell body parser to extract data from the form element
// and add it to the body propery of request
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')  
app.use(express.static('public'));
app.use(bodyParser.json());

MongoClient.connect('mongodb://yawuar:test123@ds111876.mlab.com:11876/crud_tutorial', (err, database) => {
    // ... start the server
    if(err) return console.log(err, database);
    db = database;
    app.listen(3000, () => {
		console.log('listening on 3000');
	});
})

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, results) => {
		if(err) return console.log(err);
		res.render('index.ejs', {quotes: results});
	});
	// res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) return console.log(err);

		console.log('saved to database');
		res.redirect('/');
	});
});

app.put('/quote/:name', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: req.params.name}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

app.delete('/quote/:name', (req, res) => {
  db.collection('quotes').deleteOne({name: req.params.name},
    (err, result) => {
    if (err) return res.send(500, err)
    res.send('Quote is deleted')
  });
});