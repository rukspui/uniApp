(function () {
    'use strict';

    angular
        .module('app')
        .service('CalendarService', ['$http', '$q', function($http, $q) {
            var apiUrl = '/api/events';

            this.createEvent = function(eventData) {
                var deferred = $q.defer();
                $http({
                	url: apiUrl + '/add',
                	method: 'POST',
                	data: {body: eventData}
                }).then(
                //on succes
                function(response) {
                	deferred.resolve(response);
                }, 
                //on reject
                function() {
                	deferred.reject();
                });

                return deferred.promise;

            };






       /*     this.updateEvent = function(eventData) {
                var deferred = $q.defer();
                $http({
                	url: apiUrl + '/update',
                	method: 'PUT',
                	data: {body: eventData}
                }).then(
                //on succes
                function(response) {
                	deferred.resolve(response);
                }, 
                //on reject
                function() {
                	deferred.reject();
                });

                return deferred.promise;

            };


            this.getAllEvents = function() {
            	var deferred = $q.defer();
                $http({
                	url: apiUrl + '/getEvents',
                	method: 'GET'
                }).then(
                //on succes
                function(response) {
                	deferred.resolve(response);
                }, 
                //on reject
                function() {
                	deferred.reject();
                });

                return deferred.promise;
            };



            this.deleteEvent = function(eventData) {
                var deferred = $q.defer();
                $http({
                	url: apiUrl + '/delete',
                	method: 'DELETE',
                	data: {body: eventData}
                }).then(
                //on succes
                function(response) {
                	deferred.resolve(response);
                }, 
                //on reject
                function() {
                	deferred.reject();
                });

                return deferred.promise;

            };


*/

        }]);

    

})();