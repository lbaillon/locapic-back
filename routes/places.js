var express = require('express');
var router = express.Router();
require('../models/connexion')

const Place = require('../models/places')

router.post('/', async (req, res) => {
    const place = await Place.findOne({name: req.body.name})
    if (place !== null) {
        res.json({result: false, error: "Place already exist"})
    }else{
        const newPlace = new Place({
            nickname: req.body.nickname,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        const newDoc = await newPlace.save()
        console.log("******",newDoc)
        res.json({result: true, place: newDoc})
    }
})

router.get('/:nickname', async (req, res) => {
    const places = await Place.find({nickname: req.params.nickname})



        res.json({result: true, places: places})
    
})


router.delete('/', async (req, res) => {
    const places = await Place.deleteOne({nickname: req.body.nickname, name: req.body.name})
    res.json({result: true, places: places })
})

module.exports = router;
