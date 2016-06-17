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
service.update = update;
service.removeEvent = removeEvent;

module.exports = service;


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




function getAllEvents() {
    var deferred = Q.defer();

    var events = db.collection('events');
    events.find({}).toArray(function (err, res){
        if (err){
            deferred.reject(err);

        } else if (res.length){
            deferred.resolve(res);
        }
    })

    return deferred.promise;
}


function update(eventData) {
    var deferred = Q.defer();

    console.log('event-service!!')
    // validation
    updateEvent(eventData);


    function updateEvent(eventData) {
        console.log('updating event with id: ', eventData.id, 'and done: ', eventData.done);
        db.collection('events').update(
            { "_id": mongo.helper.toObjectID(eventData.id) },
            { $set: { body: eventData } }, function (err, res) {
                if (err) {
                    deferred.reject(err);
                    console.log(err)
                }
                console.log('WORKED!!')
                deferred.resolve(res);
            });
            
    }

    return deferred.promise;

}


function removeEvent(id) {
    var deferred = Q.defer();

    // validation
    deleteEvent(id);


    function deleteEvent(id) {
        var _id = id;
        console.log(JSON.stringify(_id, null, '\t')); 
        db.collection('events').remove(
            { "_id": mongo.helper.toObjectID(id) },
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                    console.log(err)
                }
                deferred.resolve(res);
            });
            
    }

    return deferred.promise;
}

