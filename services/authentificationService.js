'use strict';

angular.module('module')
.service('authentificationService',  ['$http',function ($http) {
    return {
        urlLogin: serverRest+'/Login',
        getUser: function () {
            var user = angular.fromJson(localStorage.authentificationService);
            return user;
        },
        setUser: function (newUser) {
            var user = newUser;
            localStorage.authentificationService = JSON.stringify(user);
        },
        isConnected: function () {
            if( localStorage.authentificationService){
                var user = JSON.parse(localStorage.authentificationService);
            }else{
                var user = null;
            }
            return !!user;
        },
        login: function (utilisateur) {
            return $http({ method: 'POST', url: this.urlLogin, params: utilisateur })
            .then(function (response) {
                return response.data;
            });
        }
    };
}]);