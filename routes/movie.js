const express = require('express');
const router = express.Router();
// Models
const Movie = require('../models/Movie');

router.post('/', function(req, res, next) {
  // const {title, imdb_score, category, country, year} = req.body;
  const movie = new Movie(req.body);
/*  
  movie.save((err,data)=> {
    if (err)
      res.json(err);
    res.json({status: 1});
  }); */

  // PROMISE YAPISI İLE
  const promise = movie.save();
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  });
});

router.get('/',(req,res)=> {
  const promise = Movie.find({});
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  });
});

router.get('/:movie_id',(req,res)=> {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=> {
    res.json(movie);
  }).catch((err)=> {
    res.json(err);
  })
});



module.exports = router;
