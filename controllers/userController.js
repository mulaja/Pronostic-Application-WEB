'use strict';

angular.module('module')
.controller('userController', ['$location', 'userService', 'authentificationService', function ($location, userService, authentificationService) {

    var userCtrl = this;

    userCtrl.addUser = function () {
        // On crypte le mot de passe
        var utilisateur = { lastname: userCtrl.user.lastname, firstname: userCtrl.user.firstname, pseudonyme: userCtrl.user.pseudonyme, password: calcMD5(userCtrl.user.password), email: userCtrl.user.email };

        userService.addUser(utilisateur).then(function (response) {

            authentificationService.setUser(response);
            $location.url('/home');

        }).catch(function (error) {

            userCtrl.error = error.data.message;

        });
    };

    userCtrl.getUser = function (ident) {
        return userService.getUser(userCtrl.user);
    };

    userCtrl.getListUsers = function () {
        return userService.getListUsers(userCtrl.user);
    };

    userCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

}]);