﻿var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'Ooops... a apărut o eroare!' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                functia: req.body.functia,
                an: req.body.an,
                grupa: req.body.grupa
            });
        }

        // return to login page with success message
        req.session.success = 'Înregistare efectuată cu succes!';
        return res.redirect('/login');
    });
});

module.exports = router;