'use strict';

angular.module('module')
.provider('indexService', function () {
    this.$get = function ($http) {
        return {
            urlVersion: serverRest+'/Version',
            version: function () {
                    return $http.get(this.urlVersion).then(function (response) {
                        return response.data;
                    }
                );
            }
        };
    };
});