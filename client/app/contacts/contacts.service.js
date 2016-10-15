'use strict';

angular.module('apiMeanApp')
    .factory('ContactsService', function ($resource) {
        return $resource('/api/contacts/:id/:controller', {
                id: '@_id'
            },
            {
                changePassword: {
                    method: 'PUT',
                    params: {
                        controller:'password'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id:'me'
                    }
                },
                update: {
                    method: 'PUT'
                }
            });
    });
