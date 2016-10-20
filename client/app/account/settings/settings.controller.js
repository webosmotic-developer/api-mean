'use strict';

angular.module('apiMeanApp')
    .controller('SettingsCtrl', function ($scope, User, Auth, toastr, $mdDialog) {

        var vm = this;
        vm.isUsersLoading = false;
        vm.user = Auth.getCurrentUser();

        vm.fnGetUsers = function () {
            vm.isUsersLoading = true;
            Auth.isLoggedInAsync(function (isLoggedInAsync) {
                if (isLoggedInAsync && Auth.isAdmin()) {
                    User.query(function (data) {
                        vm.usersArray = data;
                        vm.isUsersLoading = false;
                    }, function (err) {
                        vm.isUsersLoading = false;
                    });
                }
            });
        };

        vm.fnUpdateProfile = function () {
            vm.submitAttempt = true;
            User.update(vm.user, function (data) {
                toastr.success('Profile updated successfully');
            }, function (error) {
                toastr.error('Error updating profile');
            });
        };

        vm.fnChangePassword = function (form) {
            if (form.$valid) {
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                    .then(function () {
                        form.$setPristine();
                        toastr.success('Password successfully changed.');
                    })
                    .catch(function (error) {
                        toastr.error('Wrong current password');
                    });
            }
        };

        vm.fnAddUser = function (user) {
            $mdDialog.show({
                locals: {editUser: angular.copy(user)},
                templateUrl: 'app/account/settings/userModal/userModal.html',
                controller: 'UserModalCtrl as userModal'
            }).then(function () {
                vm.fnGetUsers();
            });
        };

        vm.fnDeleteUser = function (ev, id) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this user?')
                .ariaLabel('DELETE')
                .targetEvent(ev)
                .ok('DELETE')
                .cancel('CANCEL');
            $mdDialog.show(confirm).then(function () {
                User.remove({id: id}, function () {
                    toastr.success('User successfully deleted');
                    vm.fnGetUsers();
                }, function (error) {
                    toastr.error(error.message);
                });
            });
        };

        vm.fnOpenContactModal = function(user){
            $mdDialog.show({
                locals: {user:user},
                templateUrl: 'app/account/settings/contactDisplayModal/contactDisplayModal.html',
                controller: 'ContactModalDisplayCtrl as contactDisplay'
            });
        };

        vm.fnSettings = function () {
            vm.fnGetUsers();
        }
    });
