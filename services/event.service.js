var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('events');

var service = {};

service.getAllEvents = getAllEvents;
service.create = create;
// service.update = update;
// service.delete = _delete;

module.exports = service;

function getAllEvents() {
    var deferred = Q.defer();

    // setTimeout(function() {
    // 	deferred.resolve({id: _.uniqueId(), data: "test data"});
    // }, 1000);

    db.events.find(
            {},
            {},
            function (err, doc) {
                if (err) {
                    console.log('db fail', err);
                    deferred.reject(err);
                }
                // console.log('db ok!', doc);
                deferred.resolve(doc);
            });

    return deferred.promise;
}

function create(eventParam) {
    var deferred = Q.defer();

    // validation
	createEvent();


    function createEvent() {
        db.events.insert(
            eventParam,
            function (err, doc) {
                if (err) {
                    console.log('db post fail!', err);
                    deferred.reject(err);
                }

                deferred.resolve();
            });
    }

    return deferred.promise;
}
