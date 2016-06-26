'use strict';

angular.module('module')
.provider('calendarService', function () {
    this.$get = function ($http) {
        return {
            urlListFixtures: serverRest+'/Match',
            urlListPronostics: serverRest+'/Prognosis',
            urlListRangs: serverRest+'/Rangs',
            urlListUsers: serverRest+'/Users',
            urlListGroups: serverRest+'/Groups',
            getListFixtures: function () {

                return $http({ method: 'GET', url: this.urlListFixtures}).then(function (response) {

                    var listFixtures = [];
                    var listDates = [];

                    // Listes des matchs
                    for (var i = 0; i < response.data.length; i++) {
                        var date = response.data[i].date.substring(0, response.data[i].date.indexOf('T'));
                        if (!listFixtures[date]) {
                            listFixtures[date] = [];
                        }
                        
                        var time_full = response.data[i].date.substring(response.data[i].date.indexOf('T') +1,response.data[i].date.length-1);
                        var time = time_full.substring(0,time_full.lastIndexOf(":"));
                        response.data[i].time = time;
                        
                        listFixtures[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var fixture in listFixtures) {
                        listDates.push({ date: new Date(fixture), data: listFixtures[fixture] });
                    }

                    listDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.date) - new Date(b.date);
                     });       

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

                        var time_full = response.data[i].date.substring(response.data[i].date.indexOf('T') +1,response.data[i].date.length-1);
                        var time = time_full.substring(0,time_full.lastIndexOf(":"));
                        response.data[i].time = time;

                        listPronostics[date].push(response.data[i]);
                    }

                    // Cr�ation de l'objet complexe
                    for (var pronostic in listPronostics) {
                        listDates.push({ date: new Date(pronostic), data: listPronostics[pronostic] });
                    }

                    listDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.date) - new Date(b.date);
                     });       

                    return listDates;
                });
            },
            savePrognosis: function (pronostics) {
                return $http.post(this.urlListPronostics, pronostics).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });

            },
            getRangs: function () {
                return $http.get(this.urlListRangs).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            },
            getUsers : function(){
                return $http.get(this.urlListUsers).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            },
            addGroup : function(group){
                return $http.post(this.urlListGroups, group).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            },
            getGroups : function(idUser){
                 return $http.get(this.urlListGroups+'/'+idUser).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            },
            modifyGroup : function(group){
                return $http.post(this.urlListGroups+'/'+group.id, group).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            },
            deinscriptionGroupe : function($id_utilisateur,$id_groupe){
               return $http({ method: 'DELETE', url: this.urlListGroups+'/'+$id_groupe, params: { id_user: $id_utilisateur } }).then(function (response) {
                    return response.data;
                }).catch(function(error){
                    return error.message;
                });
            }
        };
    };
});