'use strict';

angular.module('module')
.filter('filterGroup',function(){
          return function(utilisateurs,classement){
            return utilisateurs && utilisateurs.filter( function (item){ 
                for(var i =0; i< classement.length; i++ ){
                    if(classement[i].id == item.id){
                        return false;
                    }
                }
                return true;
            });
      };
});