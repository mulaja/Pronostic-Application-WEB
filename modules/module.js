'use strict';

angular.module('module', ['ngRoute', 'ngMaterial', 'ngResource'])

.config(function ($routeProvider) {
    $routeProvider.when('/users', {
        templateUrl: '../views/userListView.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
    });

    $routeProvider.when('/login', {
        templateUrl: '../views/login.html',
        controller: 'authentificationController',
        controllerAs: 'authentificationCtrl'
    });

    $routeProvider.when('/create', {
        templateUrl: '../views/creation_utilisateur.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
    });

    $routeProvider.when('/home', {
        templateUrl: '../views/match.html',
        controller: 'calendarController',
        controllerAs: 'calendarCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/login'
    });
});
