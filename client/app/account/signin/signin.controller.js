'use strict';

angular.module('apiMeanApp')
    .controller('SignInCtrl', function ($scope, Auth, $location, $window, $state, toastr) {
        var vm = this;
        vm.isSignIngIn = false;
        vm.user = {};

        vm.fnSignIn = function (form) {
            vm.isSignIngIn = true;
            if (form.$valid) {
                Auth.signin({
                    email: vm.user.email,
                    password: vm.user.password
                }).then(function (data) {
                    // Logged in, redirect to home
                    toastr.success('Welcome ' + data.user.name);
                    vm.isSignIngIn = false;
                    $state.go('main.contacts');
                }).catch(function (err) {
                    toastr.error('Email or password incorrect');

                });
            }
        };

        vm.fnSignInOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
