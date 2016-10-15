/**
 * Created by LENOVO on 10/13/2016.
 */
angular.module('apiMeanApp')
    .controller('contactsCtrl', function (User, toastr, $mdDialog, ContactsService, Auth) {
        var vm = this;
        vm.fnGetContacts = function () {
            vm.ContactsArray = ContactsService.query();
        };

        vm.fnAddContact = function () {
            $mdDialog.show({
                locals: {user: Auth.getCurrentUser(), contact: {}},
                templateUrl: 'app/contacts/contact/contact.html',
                controller: 'contactCtrl as conCtrl'
            }).then(function () {
                vm.fnGetContacts();
            });
        };

        vm.fnEditContact = function (contact) {
            $mdDialog.show({
                locals: {user: Auth.getCurrentUser(), contact: contact},
                templateUrl: 'app/contacts/contact/contact.html',
                controller: 'contactCtrl as conCtrl'
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
