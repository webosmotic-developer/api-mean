'use strict';
angular.module('apiMeanApp')
    .controller('ContactsCtrl', function (User, toastr, $mdDialog, ContactsService, Auth, socket) {

        var vm = this;
        vm.isContactsLoaded = false;
        vm.user = Auth.getCurrentUser();
        vm.showSearch = false;

        vm.fnToggleSearch = function(){
            vm.showSearch = !vm.showSearch ;
        };

        vm.fnGetContacts = function () {
            vm.isContactsLoaded = true;
            Auth.isLoggedInAsync(function (isLoggedInAsync) {
                if (isLoggedInAsync) {
                    User.getContacts({id: vm.user._id},
                        function (data) {
                            vm.contactsArray = data;
                            vm.isContactsLoaded = false;
                            socket.syncUpdates('contact', vm.contactsArray);
                        });
                }
            });
        };

        vm.fnOpenContactModel = function (contact) {
            $mdDialog.show({
                locals: {user: vm.user, contact: angular.copy(contact)},
                templateUrl: 'app/contacts/contact/contact.html',
                controller: 'ContactCtrl as conCtrl'
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
                }, function () {
                    toastr.error('Contact not remove');
                });
            });
        };

        vm.fnInit = function () {
            vm.fnGetContacts();
        }
    });
