(function () {
    'use strict';

    angular
        .module('app')
        .controller('Email.IndexController', Controller);
            $scope.user = null;

            initController();

            function initController() {
                // get current user
                UserService.GetCurrent().then(function (user) {
                    $scope.user = user;
                });
            }