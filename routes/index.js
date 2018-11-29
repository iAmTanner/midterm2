var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/productDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var productSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Price: String,
    Image: {type: String, default: 'https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SbWFlHi2cej7BxV-5c0tld3OFM1pgNDI%2Fothertechniques-edges-none.png'},
    Ordered: Number
});

var Product = mongoose.model('Product', productSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


router.get('/', (req, res) => {
    res.sendFile('index.html', { root:  'public' });
});

router.get('/customer', (req, res) => {
    res.sendFile('customer.html', { root:  'public' });
});

router.post('/product', function(req, res, next) {
    console.log("POST comment route"); 
    var newItem = new Product(req.body); 
    console.log(newItem); 
    newItem.save(function(err, post) { 
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/product', function(req, res, next) {
    console.log("In the GET route?");
    Product.find(function(err, productList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
          res.json(productList); //Then send the comments
      }
    })
});

router.post('/cart', function(req, res, next) {
    console.log("POST cart route"); 
    var newItem = new Product(req.body); 
    console.log(newItem); 
    newItem.save(function(err, post) { 
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/cart', function(req, res, next) {
    console.log("In the GET route?");
    Product.find(function(err, productList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
          res.json(productList); //Then send the comments
      }
    })
});

router.get('/delete/:name', function(req, res) {
    var name = req.params.name;
    
   Product.deleteMany({ Name: name }, function(data) {
       console.log(data);
   });
   res.status(200).send("OK");
});

router.get('/cleardb', function(req, res) {
   Product.deleteMany({}, function(data) {
       console.log(data);
   });
   res.status(200).send("OK");
});

router.get('/purchase/:name', function(req, res, next) {
    console.log(req.params.name);
    var conditions = {Name: req.params.name}, update = { $inc: { Ordered: 1 }};
    Product.update(conditions, update).exec();
});

// router.get('/comment/:name', function(req, res) {
//   console.log(req.params.name);
//   Comment.find({Name: req.params.name}, function(err, docs) {
//       if (err) return console.error(err);
//       else
//         res.json(docs);
//   });
// });

module.exports = router;