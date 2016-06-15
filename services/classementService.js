'use strict';

angular.module('module')
.provider('classementService', function () {
    this.$get = function ($http) {
        return {
            url : urlAPISoccer+'/leagueTable',
            getClassement: function () {
                return $http({method : 'GET', url : this.url, headers: {'X-Auth-Token': keyAPISoccer} }).then(function (response) {
                    return response.data.standings;
                });
            }
        };
    }
});