'use strict';

angular.module('module')
.provider('calendarService', function () {
    this.$get = function ($http, $rootScope) {
        $rootScope.header = true;
        return {
            urlSoccerseasonsEuropeanChampionships: 'http://api.football-data.org/v1/soccerseasons/424',
            urlListPronostics: 'http://mulaja.esy.es/rest.php/Prognosis',
            urlListRangs: 'http://mulaja.esy.es/rest.php/Rangs',
            headers: { headers: { 'X-Auth-Token': 'c704e31943a3421f99e72eb5b6c4fdc6' }, method: 'GET' },
            getListFixtures: function () {

                var headers = this.headers;
                headers.url = this.urlSoccerseasonsEuropeanChampionships + '/fixtures';

                return $http(this.headers).then(function (response) {

                    var listFixtures = [];
                    var listDates = [];

                    // Listes des matchs
                    for (var i = 0; i < response.data.fixtures.length; i++) {
                        var date = response.data.fixtures[i].date.substring(0, response.data.fixtures[i].date.indexOf('T'));
                        if (!listFixtures[date]) {
                            listFixtures[date] = [];
                        }

                        listFixtures[date].push(response.data.fixtures[i]);
                    }

                    // Création de l'objet complexe
                    for (var fixture in listFixtures) {
                        listDates.push({ date: new Date(fixture).getTime(), data: listFixtures[fixture] });
                    }

                    return listDates;
                });
            },
            getListPronostics: function (idUser) {
                return $http({ method: 'GET', url: this.urlListPronostics, params: { id_user: idUser } }).then(function (response) {

                    var listPronostics = [];
                    var listDates = [];

                    // Listes des pronostics
                    for (var i = 0; i < response.data.length; i++) {
                        var date = response.data[i].date.substring(0, response.data[i].date.indexOf('T'));

                        if (!listPronostics[date]) {
                            listPronostics[date] = [];
                        }

                        listPronostics[date].push(response.data[i]);
                    }

                    // Création de l'objet complexe
                    for (var pronostic in listPronostics) {
                        listDates.push({ date: new Date(pronostic).getTime(), data: listPronostics[pronostic] });
                    }

                    return listDates;
                });
            },
            savePrognosis: function (pronostics) {
                return $http.post(this.urlListPronostics, pronostics).then(function (response) {
                    return response.data;
                });

            },
            getRangs: function () {
                return $http.get(this.urlListRangs).then(function (response) {
                    return response.data;
                });
            }
        };
    };
});