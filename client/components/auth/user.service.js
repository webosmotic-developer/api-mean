'use strict';

angular.module('apiMeanApp')
    .factory('User', function ($resource) {
        return $resource('/api/users/:id/:controller', {
                id: '@_id'
            },
            {
                changePassword: {
                    method: 'PUT',
                    params: {
                        controller: 'password'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id: 'me'
                    }
                },
                getContacts: {
                    method: 'GET',
                    params: {
                        controller: 'contacts'
                    },
                    isArray: true
                },
                update: {
                    method: 'PUT'
                },
                logout: {
                    method: 'POST',
                    params: {
                        id: 'logout'
                    }
                }
            });
    });
