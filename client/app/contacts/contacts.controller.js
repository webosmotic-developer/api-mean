'use strict';
angular.module('apiMeanApp')
    .controller('ContactsCtrl', function (User, toastr, $mdDialog, ContactsService, Auth, socket) {

        var vm = this;
        vm.isContactsLoaded = false;
        vm.user = Auth.getCurrentUser();

        vm.fnGetContacts = function () {
            vm.isContactsLoaded = true;
            Auth.isLoggedInAsync(function (isLoggedInAsync) {
                if (isLoggedInAsync) {
                    vm.contactsArray = User.getContacts({id: vm.user._id});
                    vm.isContactsLoaded = false;
                }
            });
        };

        vm.fnOpenContactModel = function (contact) {
            $mdDialog.show({
                locals: {user: vm.user, contact: contact},
                templateUrl: 'app/contacts/contact/contact.html',
                controller: 'ContactCtrl as conCtrl'
            }).then(function () {
                vm.fnGetContacts();
            });
        };

        vm.fnDeleteContact = function (ev, id) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this contact ?')
                .ariaLabel('DELETE')
                .targetEvent(ev)
                .ok('DELETE')
                .cancel('CANCEL');
            $mdDialog.show(confirm).then(function () {
                ContactsService.remove({id: id}, function () {
                    toastr.success('Contact removed successfully.');
                    vm.fnGetContacts();
                }, function () {
                    toastr.error('Contact not remove');
                });
            });
        };

        vm.fnInit = function () {
            vm.fnGetContacts();
        }
    });
