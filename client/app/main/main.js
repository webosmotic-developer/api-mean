'use strict';

angular.module('apiMeanApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl as main',
                abstract: true,
                authenticate: true
            });
    });
