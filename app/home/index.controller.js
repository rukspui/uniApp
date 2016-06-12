(function() {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', ['$scope', 'UserService',
            'uiCalendarConfig', 'CalendarService',
            function($scope, UserService, uiCalendarConfig,
                CalendarService) {
                $scope.user = null;

                initController();

                function initController() {
                    // get current user
                    UserService.GetCurrent()
                        .then(function(user) {
                            $scope.user = user;
                        });
                }

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                $scope.changeTo = 'English';
                /* event source that pulls from google.com */

                /* event source that contains custom events on the scope */
                /*
                 * TODO: Instead of a static array, do a GET request to get events from DB
                 */
                $scope.events = [{
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                }, {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2)
                }, {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false
                }, {
                    id: 998,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false
                }, {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false
                }, {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }];
                /* event source that calls a function on every view switch */
                $scope.eventsF = function(start, end, timezone,
                    callback) {
                    var s = new Date(start)
                        .getTime() / 1000;
                    var e = new Date(end)
                        .getTime() / 1000;
                    var m = new Date(start)
                        .getMonth();
                    var events = [{
                        title: 'Feed Me ' + m,
                        start: s + (50000),
                        end: s + (100000),
                        allDay: false,
                        className: ['customFeed']
                    }];
                    callback(events);
                };

                $scope.calEventsExt = {
                    color: '#f00',
                    textColor: 'yellow',
                    events: [{
                        type: 'party',
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false
                    }, {
                        type: 'party',
                        title: 'Lunch 2',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false
                    }, {
                        type: 'party',
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/'
                    }]
                };
                /* alert on eventClick */
                $scope.alertOnEventClick = function(date, jsEvent, view) {
                    $scope.alertMessage = (date.title +
                        ' was clicked ');
                };
                /* alert on Drop */
                $scope.alertOnDrop = function(event, delta, revertFunc,
                    jsEvent, ui, view) {
                    $scope.alertMessage = (
                        'Event Dropped to make dayDelta ' +
                        delta);
                };
                /* alert on Resize */
                $scope.alertOnResize = function(event, delta,
                    revertFunc, jsEvent, ui, view) {
                    $scope.alertMessage = (
                        'Event Resized to make dayDelta ' +
                        delta);
                };
                /* add and removes an event source of choice */
                $scope.addRemoveEventSource = function(sources, source) {
                    var canAdd = 0;
                    angular.forEach(sources, function(value, key) {
                        if (sources[key] === source) {
                            sources.splice(key, 1);
                            canAdd = 1;
                        }
                    });
                    if (canAdd === 0) {
                        sources.push(source);
                    }
                };

                /* add custom event*/
                $scope.addEvent = function() {
                    $scope.events.push({
                        title: 'Add title here',
                        start: new Date(y, m, d),
                        end: new Date(y, m, d),
                        className: ['openSesame']
                    });
                };
                /* remove event */
                $scope.remove = function(index, id) {
                    CalendarService.deleteEvent(id);
                    $scope.events.splice(index, 1);
                };
                /* Change View */
                $scope.changeView = function(view, calendar) {
                    uiCalendarConfig.calendars[calendar].fullCalendar(
                        'changeView', view);
                };
                /* Change View */
                $scope.renderCalender = function(calendar) {
                    $timeout(function() {
                        if (uiCalendarConfig.calendars[
                            calendar]) {
                            uiCalendarConfig.calendars[
                                calendar].fullCalendar(
                                'render');
                        }
                    });
                };
                /* Render Tooltip */
                $scope.eventRender = function(event, element, view) {
                    element.attr({
                        'tooltip': event.title,
                        'tooltip-append-to-body': true
                    });
                    $compile(element)($scope);
                };
                /* config object */
                $scope.uiConfig = {
                    calendar: {
                        height: 450,
                        editable: true,
                        header: {
                            left: 'title',
                            center: '',
                            right: 'today prev,next'
                        },
                        eventClick: $scope.alertOnEventClick,
                        eventDrop: $scope.alertOnDrop,
                        eventResize: $scope.alertOnResize,
                        eventRender: $scope.eventRender
                    }
                };

                $scope.changeLang = function() {
                    if ($scope.changeTo === 'English') {
                        $scope.uiConfig.calendar.dayNames = [
                            "Sunday", "Monday", "Tuesday",
                            "Wednesday", "Thursday", "Friday",
                            "Saturday"
                        ];
                        $scope.uiConfig.calendar.dayNamesShort = [
                            "Sun", "Mon", "Tue", "Wed", "Thu",
                            "Fri", "Sat"
                        ];
                        $scope.changeTo = 'Romanian';
                    } else {
                        $scope.uiConfig.calendar.dayNames = ["Luni",
                            "Marți", "Miercuri", "Joi",
                            "Vineri", " Sâmbătă", "Duminică"
                        ];
                        $scope.uiConfig.calendar.dayNamesShort = [
                            "Lun", "Mar", "Mie", "Joi", "Vin",
                            "Sâm", "Dum"
                        ];
                        $scope.changeTo = 'English';
                    }
                };
                /* event sources array*/
                $scope.eventSources = [$scope.events, $scope.eventsF];

                // View functions
                $scope.createdEvent = {};

                $scope.addEvent = function(eventData) {
                    if (eventData.title && eventData.dateStart &&
                        eventData.dateEnd) {
                        $scope.eventInvalid = false;

                        var requestBody = {
                            title: eventData.title,
                            start: new Date(eventData.dateStart),
                            end: new Date(eventData.dateEnd),
                            type: eventData.type,
                            userId: UserService.GetCurrent()
                                //availableFor: 

                        }

                        CalendarService.createEvent(requestBody)
                            .then(
                                function(response) {
                                    $scope.getAllEvents();

                                },
                                function(error) {

                                });


                        //todo: move getAllEvents request to other function. And put the result in $scope.events
                        CalendarService.getAllEvents()
                            .then(
                                function(response) {
                                    console.log(response);
                                },
                                function() {

                                });

                        eventData.title = null;
                        eventData.dateStart = null;
                        eventData.dateEnd = null;
                    } else {
                        $scope.eventInvalid = true;
                    }

                }



                $scope.getAllEvents = function() {

                    CalendarService.getAllEvents()
                        .then(
                            function(response) {
                                //$scope.events = requestBody;
                                console.log(response);
                                var events = response.data;

                                //empty events list

                                while($scope.events.length) {
                                    $scope.events.pop();
                                };

                                events.map(function(event) {
                                    $scope.events.push({
                                        id: event._id,
                                        title: event.body.title,
                                        type: event.body.type,
                                        start: event.body.start,
                                        end: event.body.end
                                    });
                                })
                            },
                            function(error) {

                            });

                }
                $scope.getAllEvents();

                // datepicker hooks

                setTimeout(function() {
                    var dateConfig = {
                        format: 'DD.MM.YYYY'
                    };

                    $('#startDate')
                        .datetimepicker(dateConfig)
                        .on('dp.change', function(date) {
                            $scope.createdEvent.dateStart =
                                date.date;
                        });
                    $('#endDate')
                        .datetimepicker(dateConfig)
                        .on('dp.change', function(date) {
                            $scope.createdEvent.dateEnd =
                                date.date;
                        });;
                }, 1000);

            }
        ]);

})();