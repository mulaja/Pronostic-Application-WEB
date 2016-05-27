'use strict';

angular.module('module')
.controller('profilController', ['$location', 'profilService', 'authentificationService', function ($location, profilService, authentificationService) {

    var profilCtrl = this;
    
    profilCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };
    
    profilCtrl.getClass = function (id_avatar){
        if( profilCtrl.profil.id_avatar == id_avatar){
            return "avatar_selected";
        }
    };
    
    profilCtrl.selection = function (id_avatar){
        profilCtrl.profil.id_avatar = id_avatar;
    };
    
    // On r�cup�re les pronostics
    if (profilCtrl.isConnected()) {
        profilService.getProfil(authentificationService.getUser().id).then(function (profil) {
            profilCtrl.profil = profil.user;
            profilCtrl.listAvatar = profil.listAvatar;
        });
    }
    
    profilCtrl.saveProfil = function(){
        profilService.saveProfil(authentificationService.getUser().id, profilCtrl.profil).then(function(user){
            profilCtrl.class = "success";
            profilCtrl.message = "Les modifications ont été prise en compte";
            authentificationService.setUser(user);
        }).catch(function(response){
            profilCtrl.class = "warning";
            profilCtrl.message = response.data.message;
        });
    }

}]);