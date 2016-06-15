'use strict';

angular.module('module')
.controller('prognosisController', ['prognosisService', 'authentificationService', function (prognosisService, authentificationService) {

    var prognosisCtrl = this;

    prognosisCtrl.isMySelf = function (id) {
        return authentificationService.getUser().id == id;
    };

    // On r�cup�re la liste des matchs
    prognosisService.getAllPrognosis().then(function (fixtures) {
        prognosisCtrl.fixtures = fixtures; 
        
    });

}]);