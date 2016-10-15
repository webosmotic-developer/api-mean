/**
 * Created by LENOVO on 10/13/2016.
 */
'use strict';

angular.module('apiMeanApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main.contacts', {
                url: 'contacts',
                templateUrl: 'app/contacts/contacts.html',
                controller: 'contactsCtrl as contacts',
                authenticate: true
            });
    });
