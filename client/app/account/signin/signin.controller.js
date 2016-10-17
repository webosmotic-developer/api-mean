'use strict';

angular.module('apiMeanApp')
    .controller('SignInCtrl', function ($scope, Auth, $location, $window, $state, toastr) {
        var vm = this;
        vm.user = {};

        vm.fnSignIn = function (form) {
            vm.submitted = true;

            if (form.$valid) {
                Auth.signin({
                    email: vm.user.email,
                    password: vm.user.password
                })
                    .then(function (data) {
                        // Logged in, redirect to home
                        toastr.success('Welcome ' + data.user.name);
                        $state.go('main.contacts');
                    })
                    .catch(function (err) {
                        toastr.error('Email or password incorrect');

                    });
            }
        };

        vm.fnSignInOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
