/**
 * Created by LENOVO on 10/14/2016.
 */
angular.module('apiMeanApp')
    .controller('ContactCtrl', function ($mdDialog, ContactsService, toastr, user, contact) {
        var vm = this;

        vm.fnCloseDialog = function () {
            $mdDialog.hide();
        };

        vm.fnCloseDialogCancel = function () {
            $mdDialog.cancel();
        };

        vm.fnSaveContact = function (contact) {
            if (contact._id) {
                ContactsService.update(vm.contact, function () {
                    toastr.success('Contact updated Successfully');
                    $mdDialog.hide();
                }, function () {
                    toastr.error(error.message);
                    $mdDialog.hide();
                })
            } else {
                (vm.contact).userId = user._id;
                ContactsService.save(vm.contact, function () {
                    toastr.success('Contact added successfully');
                    vm.fnCloseDialog();
                }, function (error) {
                    toastr.error(error.message);
                    $mdDialog.hide();
                });
            }
        };

        vm.fnInit = function () {
            vm.contact = contact;
        }
    });

