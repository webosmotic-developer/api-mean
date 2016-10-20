'use strict';
angular.module('apiMeanApp')
    .controller('ContactModalDisplayCtrl', function (Auth, User, user, $mdDialog) {
        var vm = this;
        vm.user = user;
        vm.fnGetContacts = function () {
            Auth.isLoggedInAsync(function (isLoggedInAsync) {
                if (isLoggedInAsync) {
                    User.getContacts({id: user._id},
                        function (data) {
                            vm.contactsArray = data;
                        });
                }
            });
        };

        vm.fnCloseDialogCancel = function () {
            $mdDialog.cancel();
        };

        vm.fnInit = function () {
            vm.fnGetContacts();
        }
    });
