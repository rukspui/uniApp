(function () {
    'use strict';

    angular
        .module('app')
        .controller('Servicii.IndexController', Controller);

    function Controller($scope, UserService) {


        function initController() {
            // get current user
            UserService.GetAll().then(function (users) {
                $scope.profesori = users.filter(function(user) {
                    console.log(user)
                    return user.functia === 'profesor';
                });
                $scope.studenti = users.filter(function(user) {
                    return user.functia === 'student';
                });

                

            });
        }

        initController();

      
    }

})();