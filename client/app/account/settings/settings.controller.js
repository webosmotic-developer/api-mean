'use strict';

angular.module('apiMeanApp')
    .controller('SettingsCtrl', function ($scope, User, Auth, toastr, $mdDialog) {

        var vm = this;
        vm.isAdmin = Auth.isAdmin();
        vm.user = Auth.getCurrentUser();
        vm.UsersArray = User.query();

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
                controller: 'userModalCtrl as userModal'
            }).then(function () {
                vm.UsersArray = User.query();
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
                    vm.UsersArray = User.query();
                }, function (error) {
                    toastr.error(error.message);
                });
            });
        };

        vm.fnSettings = function(){
            if(vm.isAdmin){
                vm.UsersArray = User.query();
            }
        }
    });
