'use strict';

angular.module('module')
.provider('userService', function () {
    this.$get = function ($http) {
        return {
            urlUsers: 'http://mulaja.esy.es/rest.php/Users',
            getListUsers: function () {
                return $http.get(this.urlUsers).then(function (response) {
                    return response.data;
                });
            },
            getUser: function (id) {
                return $http.get(this.urlUsers + id).then(function (response) {
                    return response.data;
                });
            },
            addUser: function (user) {
                return $http({ method: 'POST', url: this.urlUsers, params: user }).then(function (response) {
                    return response.data;
                });
            }
        };
    };
});