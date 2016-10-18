'use strict';

angular.module('apiMeanApp')
    .controller('SignUpCtrl', function ($scope, Auth, $location, $window, toastr) {
        var vm = this;
        vm.user = {};

        vm.fnSignUp = function () {
            Auth.createUser({
                name: vm.user.name,
                email: vm.user.email,
                password: vm.user.password
            }).then(function () {
                // Account created, redirect to home
                toastr.success('Account Created');
                $location.path('/login');
            }).catch(function (err) {
                err = err.data;
                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function (error) {
                    toastr.error(error.message);
                });
            });
        };

        vm.fnSignUpOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
