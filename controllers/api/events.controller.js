var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/event.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/add', addEvent);
router.get('/current', getCurrentEvent);
router.put('/:_id', updateEvent);
router.delete('/:_id', deleteEvent);

module.exports = router;

function addEvent(req, res) {
    eventService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });


function getCurrentEvent(req, res) {
    eventService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateEvent(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own event
        return res.status(401).send('You can only update your own account');
    }

    eventService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteEvent(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own event
        return res.status(401).send('You can only delete your own events');
    }

    eventService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}