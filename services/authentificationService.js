'use strict';

angular.module('module')
.service('authentificationService',  ['$http',function ($http) {
    return {
        user: null,
        getUser: function () {
            this.user = angular.fromJson(localStorage.authentificationService);
            return this.user;
        },
        setUser: function (newUser) {
            this.user = newUser;
            localStorage.authentificationService = JSON.stringify(this.user);
        },
        isConnected: function () {
            if( localStorage.authentificationService){
                this.user = JSON.parse(localStorage.authentificationService);
            }else{
                this.user = null;
            }
            return !!this.user;
        },
        login: function (utilisateur) {
            return $http({ method: 'POST', url: 'http://mulaja.esy.es/rest.php/Login', params: utilisateur })
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                return error.data.message;
            });
        }
    };
}]);