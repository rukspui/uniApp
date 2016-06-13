var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);
router.getAll('/all', getAllUsers);

module.exports = router;

function getAllUsers(req, res) {
    userService.getAll()
    .then(function (users) {
        var users = {
            profesori: _.filter(users, function (u) {
                return u.functia  === 'profesor';
            }),
            studenti: {
              
                L2: {
                    A1: [],
                    A2: [],
                    A3: [],
                    A4: [],
                    A5: [],
                    A6: [],
                    A7: [],
                    A8: [],
                    B1: [],
                    B2: [],
                    B3: [],
                    B4: [],
                    B5: [],
                    B6: [],
                    B7: [],
                    B8: [],
                }
            }
        };
        res.send(users);
    })
    .catch(function (error) {
        res.status(500).send(error);
    });
}

function authenticateUser(req, res) {
    userService.authenticate(req.body.functia, req.body.email, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
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

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('Poti actualiza doar contul personal');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('Poti sterge doar contul personal');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
