'use strict';

angular.module('apiMeanApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main.signin', {
                url: 'sign-in',
                templateUrl: 'app/account/signin/signin.html',
                controller: 'SignInCtrl as signin',
                authenticate: false
            })
            .state('main.signup', {
                url: 'sign-up',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignUpCtrl as signup',
                authenticate: false
            })
            .state('main.settings', {
                url: 'settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl as setting',
                authenticate: true

            });
    });
