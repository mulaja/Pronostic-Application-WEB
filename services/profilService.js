'use strict';

angular.module('module')
.provider('profilService', function () {
    this.$get = function ($http) {
        return {
            urlProfil : serverRest+'/Profil',
            getProfil: function (idUser) {
                return $http.get(this.urlProfil+'/'+idUser).then(function (response) {
                    return response.data;
                });
            },
            saveProfil: function (idUser,profil) {
                return $http.post(this.urlProfil+'/'+idUser,profil).then(function (response) {
                    return response.data;
                });
            }
        };
    }
});