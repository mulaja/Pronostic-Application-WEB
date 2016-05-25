'use strict';

angular.module('module')
.controller('authentificationController', ['$location', 'authentificationService',
    function ($location, authentificationService) {

        var authentificationCtrl = this;

        authentificationCtrl.inscription = function () {
            $location.url('/create');
        };

        authentificationCtrl.submitLogin = function () {

            if (authentificationCtrl.loginForm.$valid) {
                var utilisateur = { pseudonyme: authentificationCtrl.user.pseudonyme, password: calcMD5(authentificationCtrl.user.password) };

                authentificationService.login(utilisateur).then(function (utilisateur) {

                    authentificationService.setUser(utilisateur);
                    $location.url('/home');

                })
                .catch(function (error) {
                    authentificationCtrl.error = error.data.message;
                });
            }
        };

        if (authentificationService.isConnected()) {
            $location.url('/home');
        }

    }]);