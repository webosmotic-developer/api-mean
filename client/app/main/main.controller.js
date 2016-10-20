'use strict';

angular.module('apiMeanApp')
    .controller('MainCtrl', function ($mdSidenav, $mdDialog, $scope, $location, Auth, User) {

        var vm = this;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.fnSignOut = function () {
            User.logout(function(){
                Auth.logout();
                $location.path('/sign-in');
            });
        };

        vm.fnIsActive = function (route) {
            return route === $location.path();
        };

        vm.fnToggleLeft = function () {
            $mdSidenav('left').toggle();
        };

        var originatorEv;
        vm.fnOpenMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    });
