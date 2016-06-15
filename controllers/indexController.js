'use strict';

angular.module('module')
.controller('indexController', ['$location', 'authentificationService','indexService',
    function ($location, authentificationService,indexService) {

        var indexCtrl = this;

        indexCtrl.deconnexion = function () {
            authentificationService.setUser(null);
            $location.url('/login');
        };
        
        indexCtrl.acceuil = function () {
            $location.url('/home');
        };
        
        indexCtrl.profil = function () {
            $location.url('/profil');
        };
        
        indexCtrl.pronostic = function () {
            $location.url('/prognosis');
        };

        indexCtrl.getUserPath = function(){
            var user = authentificationService.getUser();
            return user.path;
        };
        
        indexCtrl.getUserPseudonyme = function(){
            var user = authentificationService.getUser();
            return user.pseudonyme;
        };

         // Boolean pour determiner si l'utilisateur est connect�
        indexCtrl.isConnected = function () {
            return authentificationService.isConnected();
        };

        if (indexCtrl.isConnected()) {
            indexCtrl.user = authentificationService.getUser();
            $location.url('/home');
        }
        
        indexService.version().then(function(version){
            indexCtrl.version = version;
        });

    }]);