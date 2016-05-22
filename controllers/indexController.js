'use strict';

angular.module('module')
.controller('indexController', ['$location', 'authentificationService','indexService',
    function ($location, authentificationService,indexService) {

        var indexCtrl = this;

        indexCtrl.deconnexion = function () {
            authentificationService.setUser(null);
            $location.url('/login');
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