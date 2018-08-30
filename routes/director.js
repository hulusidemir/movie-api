const express = require('express');
const router = express.Router(); 
const Director = require('../models/Director');
const mongoose = require('mongoose');

// Director Save

router.post('/',(req,res,next)=> {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    });
});

// List Directors
/* router.get('/',(req,res,next)=> {
    const promise = Director.find({});
    promise.then((directors)=> {
        res.json(directors);
    }).catch((err)=> {
        res.json(err);
    });
}); */


// List Director's Movies
router.get('/', (req,res)=> {
    const promise = Director.aggregate([
        {
            $lookup: {
                from : 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true // List Directors who has no film and who has film.
            }
        },
        {
            $group : {
                _id  : {
                    _id : '$_id',
                    name : '$name',
                    surName: '$surName',
                    bio: '$bio'
                },
                movies : {
                    $push : '$movies'
                }
            }
            
        },
        {
            $project: {
                _id: '$_id._id',
                name : '$_id.name',
                surName: '$_id.surName',
                movies: '$movies'
            }
        }
    ]);

    promise.then((movies)=> {
        res.json(movies);
    }).catch((err)=> {
        res.json(err);
    });
});

// List one director details from Director Id
router.get('/:director_id',(req,res)=> {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group :{
                _id: {
                    id: '$_id',
                    name: '$name',
                    surName: '$surName',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }

        },
        {
            $project : {
                _id: '$_id._id',
                name: '$_id.name',
                surName: '$_id.surName',
                bio: '$id.bio',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    });
});

// Update Director details using ID
router.put('/:director_id',(req,res)=> {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    });
});

// Delete Director details using ID
router.delete('/:director_id',(req,res)=> {
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then((data)=> {
        res.json({status: 1});
    }).catch((err)=> {
        res.json(err);
    });
});
module.exports = router;