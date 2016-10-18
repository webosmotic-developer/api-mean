/**
 * Created by LENOVO on 10/11/2016.
 */
'use strict';

angular.module('apiMeanApp')
    .controller('UserModalCtrl', function ($mdDialog, editUser, User, toastr) {
        var vm = this;
        vm.user = editUser;

        vm.fnCloseDialog = function () {
            $mdDialog.hide();
        };
        vm.fnCloseDialogCancel = function () {
            $mdDialog.cancel();
        };

        vm.fnSaveUser = function (user) {
            if (user._id) {
                User.update(user, function () {
                    toastr.success('Updated successfully');
                    vm.fnCloseDialog();
                }, function (error) {
                    toastr.error('error in updation');
                    vm.fnCloseDialog();
                })
            } else if (!user._id) {
                User.save(user, function () {
                    toastr.success('User Added successfully');
                    vm.fnCloseDialog();
                }, function (error) {
                    toastr.error(error.message);
                    vm.fnCloseDialog();
                });

            }
        }
    });
