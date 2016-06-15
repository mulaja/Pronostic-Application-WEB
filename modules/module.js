'use strict';

angular.module('module', ['ngRoute', 'ngMaterial', 'ngResource','angular.img'])

.config(function ($routeProvider) {
    $routeProvider.when('/users', {
        templateUrl: serverWEB+'/views/userListView.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
    });

    $routeProvider.when('/login', {
        templateUrl: serverWEB+'/views/login.html',
        controller: 'authentificationController',
        controllerAs: 'authentificationCtrl'
    });

    $routeProvider.when('/create', {
        templateUrl: serverWEB+'/views/creation_utilisateur.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
    });

    $routeProvider.when('/home', {
        templateUrl: serverWEB+'/views/match.html',
        controller: 'calendarController',
        controllerAs: 'calendarCtrl'
    });
    
    $routeProvider.when('/profil', {
        templateUrl: serverWEB+'/views/profil.html',
        controller: 'profilController',
        controllerAs: 'profilCtrl'
    });
    
    $routeProvider.when('/classement', {
        templateUrl: serverWEB+'/views/classement.html',
        controller: 'classementController',
        controllerAs: 'classementCtrl'
    });
    
    $routeProvider.when('/prognosis', {
        templateUrl: serverWEB+'/views/prognosis.html',
        controller: 'prognosisController',
        controllerAs: 'prognosisCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});
