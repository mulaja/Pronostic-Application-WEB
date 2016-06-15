'use strict';

angular.module('module')
.provider('prognosisService', function () {
    this.$get = function ($http) {
            return {
                urlAllPrognosis: serverRest+'/AllPrognosis',
                getAllPrognosis: function () {
                
                 return $http({ method: 'GET', url: this.urlAllPrognosis}).then(function (response) {
                 
                     var listFixtures = [];
                     var listDates = [];
                 
                    // Listes des matchs
                    for (var i = 0; i < response.data.length; i++) {
                        var n_id_match = response.data[i].n_id_match;
                        if (!listFixtures[n_id_match]) {
                            listFixtures[n_id_match] = {};
                            listFixtures[n_id_match].prono = [];
                        }

                        listFixtures[n_id_match].match = { n_id_match : response.data[i].n_id_match, a_home_team_name : response.data[i].a_home_team_name, a_away_team_name : response.data[i].a_away_team_name,score_home : response.data[i].score_home,score_away : response.data[i].score_away, d_date : response.data[i].d_date, a_home_team_href : response.data[i].a_home_team_href,a_away_team_href : response.data[i].a_away_team_href,a_pseudonyme : response.data[i].a_pseudonyme,a_path : response.data[i].a_path };
                        listFixtures[n_id_match].prono.push(response.data[i]);
                    }
                    
                    // Cr�ation de l'objet complexe
                    for (var fixture in listFixtures) {
                        var date = listFixtures[fixture].match.d_date.replace("T", " ");
                        date = date.replace("Z","");
                        listDates.push({ date: new Date(date), data: listFixtures[fixture] }); 
                    }

                    listDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.date) - new Date(a.date);
                     });       
                    
                    return listDates;
                 
                });
            }
            };
        }
    
 });