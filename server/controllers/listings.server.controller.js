
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {
  /* Instantiate a Listing */
  var newListing = new Listing(req.body);
  /* Then save the listing */
  newListing.save(function(err,listing) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
//need to fix update 
exports.update = function(req, res) {
  var listing = req.listing;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  Listing.findOne({code:req.listing.code},function (err, listing) {
      if (err)  return res.status(500).send(err);
       // update all params set in request body 
      for(param in req.body){
        listing[param] = req.body[param];
      }
      listing.save(function(err,listing){
        if (err)  return res.status(500).send(err);
        return res.status(200).send(listing);  
      });
    });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Remove the article */
  Listing.remove({code:listing.code},function (err, listing) {
    if (err)  return res.status(500).send(err);
    // document deleted succesfully 
    return res.status(200).send();
   });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
  Listing.find().sort({code:1}).exec(function(err,listings){
    if (err) {
      res.status(404).send(JSON.stringify({'message':'Something went wrong on our side :('}));
    }
    res.status(200).send(listings);
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).redirect('/');
    } else {
      req.listing = listing;
      next();
    }
  });
};