'use strict';

angular.module('module', ['ngRoute', 'ngMaterial', 'ngResource','angular.img'])

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
    $routeProvider.when('/profil', {
        templateUrl: '../views/profil.html',
        controller: 'profilController',
        controllerAs: 'profilCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});
