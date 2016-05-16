'use strict';

angular.module('module')
.provider('indexService', function () {
    this.$get = function ($http) {
        return {
            urlVersion: 'http://mulaja.esy.es/rest.php/Version',
            version: function () {
                    return $http.get(this.urlVersion).then(function (response) {
                        return response.data;
                    }
                );
            }
        };
    };
});