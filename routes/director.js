const express = require('express');
const router = express.Router(); 
const Director = require('../models/Director');

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
router.get('/',(req,res)=> {
    const promise = Director.aggregate([
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
            $group: {
                _id : {
                    _id : '$_id',
                    name: '$name',
                    surName: '$surName',
                    bio: '$bio'
                },
                movies : {
                    $push: '$movies'
                }
            }
        }
    ]);
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    })
});

// Find Director Using ID
router.get('/:director_id',(req,res,next)=> {
    const promise = Director.findById(req.params.director_id);
    promise.then((director)=> {
        res.json(director);
    }).catch((err)=> {
        res.json(err);
    });
});


// Update Director Using ID

router.put('/:director_id',(req,res,next)=> {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    });
});
module.exports = router;