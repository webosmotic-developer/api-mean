'use strict';

angular.module('apiMeanApp')
    .controller('SignUpCtrl', function ($scope, Auth, $location, $window, toastr) {
        var vm = this;
        vm.user = {};
        vm.errors = {};

        vm.fnSignUp = function (form) {
            vm.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: vm.user.name,
                    email: vm.user.email,
                    password: vm.user.password
                })
                    .then(function () {
                        // Account created, redirect to home
                        toastr.success('Account Created')
                        $location.path('/login');
                    })
                    .catch(function (err) {
                        toastr.error('Error creating account')
                        err = err.data;
                        vm.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            vm.errors[field] = error.message;
                        });
                    });
            }
        };

        $scope.fnSignInOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
