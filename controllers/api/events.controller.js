var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');

// routes
router.post('/add', addEvent);
router.get('/getEvents', getAllEvents);
// router.put('/:_id', updateEvent);
// router.delete('/:_id', deleteEvent);

module.exports = router;

function addEvent(req, res) {
    eventService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllEvents(req, res) {
    eventService.getAllEvents()
        .then(function (response) {
            if (response) {
                res.send(response);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}