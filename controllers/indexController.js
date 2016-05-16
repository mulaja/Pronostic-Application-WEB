'use strict';

angular.module('module')
.controller('indexController', ['$location', 'authentificationService',
    function ($location, authentificationService) {

        var indexCtrl = this;

        indexCtrl.deconnexion = function () {
            authentificationService.setUser(null);
            $location.url('/login');
        };

        if (authentificationService.isConnected()) {
            $location.url('/home');
        }

    }]);