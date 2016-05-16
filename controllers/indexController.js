'use strict';

angular.module('module')
.controller('indexController', ['$location', 'authentificationService','indexService',
    function ($location, authentificationService,indexService) {

        var indexCtrl = this;

        indexCtrl.deconnexion = function () {
            authentificationService.setUser(null);
            $location.url('/login');
        };

        if (authentificationService.isConnected()) {
            $location.url('/home');
        }
        
        indexService.version().then(function(version){
            indexCtrl.version = version;
        });

    }]);