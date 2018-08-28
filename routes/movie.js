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
// Get All Movies
router.get('/',(req,res)=> {
  const promise = Movie.find({});
  promise.then((data)=> {
    res.json(data);
  }).catch((err)=> {
    res.json(err);
  });
});


// List Top 10 Movies Using IMDB Score
router.get('/top10',(req,res)=> {
  const promise = Movie.find({ }).limit(10).sort({imbdb_score: -1});
  promise.then((movie)=> {
    res.json(movie);
  }).catch((err)=> {
    res.json(err);
  });
});


// Find Movie Using ID
router.get('/:movie_id',(req,res)=> {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=> {
    res.json(movie);
  }).catch((err)=> {
    res.json(err);
  })
});

// Delete Movie Using ID
router.delete('/:movie_id',(req,res)=> {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=> {
    res.json({status : 1});
  }).catch((err)=>{
    res.json(err);
  });
});


// Update Movie Using ID 
router.put('/:movie_id',(req,res)=> {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});
  promise.then((movie)=> {
    res.json(movie);
  }).catch((err)=> {
    res.json(err);
  });
});

// Show Movies Between Two Date

router.get('/between/:start_year/:end_year', (req,res)=> {
  const {start_year, end_year} = req.params;
  const promise = Movie.find({
    year: { "$gte" : parseInt(start_year), "$lte": parseInt(end_year)}
  });
  promise.then((movie)=> {
    res.json(movie);
  }).catch((err)=> {
    res.json(err);
  });
});




module.exports = router;
