'use strict';

angular.module('module')
.controller('classementController', ['$location', 'classementService', function ($location, classementService) {

     var classementCtrl = this;
     
     classementService.getClassement().then(function(classement){
         
         classementCtrl.groups = [];
         classementCtrl.groups.push(classement.A);
         classementCtrl.groups.push(classement.B);
         classementCtrl.groups.push(classement.C);
         classementCtrl.groups.push(classement.D);
         classementCtrl.groups.push(classement.E);
         classementCtrl.groups.push(classement.F);
         classementCtrl.groups.push(classement.G);
         classementCtrl.groups.push(classement.H);
         
     });

}]);