'use strict';

angular.module('module')
.controller('prognosisController', ['prognosisService', 'authentificationService', function (prognosisService, authentificationService) {

    var prognosisCtrl = this;

    prognosisCtrl.isMySelf = function (id) {
        return authentificationService.getUser().id == id;
    };

    prognosisCtrl.press = function(id_match){
        if(prognosisCtrl.affichage[id_match]){
            prognosisCtrl.affichage[id_match] = ! prognosisCtrl.affichage[id_match];
        }else{
            prognosisCtrl.affichage[id_match] = true;
        }
    };
    
    prognosisCtrl.affiche = function(id_match){
        return  prognosisCtrl.affichage[id_match] ?  prognosisCtrl.affichage[id_match] : false;
    };

    // On r�cup�re la liste des matchs
    prognosisService.getAllPrognosis().then(function (fixtures) {
        prognosisCtrl.fixtures = fixtures;
        prognosisCtrl.affichage = [];
        
    });
}]);