var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');

// routes
router.post('/add', addEvent);
router.get('/getEvents', getAllEvents);
router.put('/update', updateEvent);
router.delete('/delete/:id', deleteEvent);

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


function updateEvent(req, res) { 
    console.log('body for update', req.body)
    eventService.update(req.body.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function deleteEvent(req) {
   eventService.removeEvent(req.params.id)
       .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}

