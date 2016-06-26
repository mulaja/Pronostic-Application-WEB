'use strict';

angular.module('module')
.controller('calendarController', ['calendarService', 'authentificationService', function (calendarService, authentificationService) {

    var calendarCtrl = this;
    
    // Chargement en cours
    calendarCtrl.loading = true;

    // Boolean pour determiner si l'utilisateur est connect�
    calendarCtrl.isConnected = function () {
        return authentificationService.isConnected();
    };

    // Fonction pour sauvegerder les pronostics
    calendarCtrl.savePrognosis = function (pronostic) {

        var pronostics = [];
        var validate = true;
        for (var i = 0; i < pronostic.length; i++) {
            if (pronostic[i].goalsAwayTeam && pronostic[i].goalsHomeTeam) {
                
                if( parseInt(pronostic[i].matchday) > 3  ){
                    var homeWinner = document.getElementById(pronostic[i].idMatch+'-home').checked;
                    var awayWinner = document.getElementById(pronostic[i].idMatch+'-away').checked;
                    
                    if( (homeWinner && !awayWinner) || (!homeWinner && awayWinner)){
                        pronostics.push({ id_match: pronostic[i].idMatch, goalsAwayTeam: pronostic[i].goalsAwayTeam, goalsHomeTeam: pronostic[i].goalsHomeTeam, winner : homeWinner ? pronostic[i].homeTeamName : pronostic[i].awayTeamName });
                    }else{
                        calendarCtrl.class = "alert alert-warning fade in";
                        calendarCtrl.message = " Vous devez choisir un vainqueur";
                        validate = false;
                    }
                }else{
                    pronostics.push({ id_match: pronostic[i].idMatch, goalsAwayTeam: pronostic[i].goalsAwayTeam, goalsHomeTeam: pronostic[i].goalsHomeTeam});
                }
            }
        }

        if (pronostics.length > 0 && validate) {
            calendarService.savePrognosis({ id_user: authentificationService.getUser().id, pronostics: pronostics }).then(function (message) {

                message.unchange > 0 ? calendarCtrl.class = "alert alert-warning fade in" : calendarCtrl.class = "alert alert-success fade in";

                calendarCtrl.message = message.change + " modification";
                if (message.change > 1) {
                    calendarCtrl.message += "s";
                }

                if (message.unchange == 1) {
                    calendarCtrl.message += " et 1 annulation";
                }

                if (message.unchange > 1) {
                    calendarCtrl.message += " et " + message.unchange + " annulations";
                }

            }).catch(function (message) {
                calendarCtrl.class = "alert alert-warning fade in";
                calendarCtrl.message = message;
            });
        }
    };

    // Fonction pour modifier un groupe
    calendarCtrl.modifieGroupe = function(id_groupe){
        
        var groupe = {};
        groupe.user = [];
        
        groupe.id = id_groupe;
        
        for (var i = 0; i < calendarCtrl.users.length; i++) {
            if( calendarCtrl.users[i].check ){
                groupe.user.push(calendarCtrl.users[i]);
            }
        }
        calendarService.modifyGroup(groupe).then(function (groupes) {
            calendarCtrl.majListeGroupes();
        }).catch(function(message){
            calendarCtrl.class = "alert alert-warning fade in";
            calendarCtrl.message = message;
        });
        
    }
    
    // Fonction pour créer un groupe
    calendarCtrl.ajoutGroupe = function(){
        
        var groupe = {};
        groupe.user = [];
        
        groupe.nom = calendarCtrl.nomGroupe;
        
        for (var i = 0; i < calendarCtrl.users.length; i++) {
            if( calendarCtrl.users[i].check ){
                groupe.user.push(calendarCtrl.users[i]);
            }
        }
        calendarService.addGroup(groupe).then(function (groupes) {
            calendarCtrl.majListeGroupes();
        }).catch(function(message){
            calendarCtrl.class = "alert alert-warning fade in";
            calendarCtrl.message = message;
        });
        
    }

    // Fonction se déinscrire d'un groupe
    calendarCtrl.deinscription = function($id_groupe){
        calendarService.deinscriptionGroupe(authentificationService.getUser().id,$id_groupe).then(function(response){
            calendarCtrl.majListeGroupes();
        }).catch(function(message){
            calendarCtrl.class = "alert alert-warning fade in";
            calendarCtrl.message = message;
        });
    };

    // On récupère la liste des groupes de l'utilisateur
    calendarCtrl.majListeGroupes = function(){
         if (calendarCtrl.isConnected()) {
             calendarService.getGroups(authentificationService.getUser().id).then(function(groups){
                
                calendarCtrl.groups = [];
                 
                for(var index=0; index < groups.length; index++){
                    var classement = calendarCtrl.tri(groups[index].classement, calendarCtrl.compare);
                    
                    // On ajoute le rang
                    var rang = 1;
                    var compteur = 1;
                    var points = classement[0].points;
                    var winners = classement[0].winners;
                    var scores = classement[0].scores;
                    var rangs =[];
                    
                    for (var i = 0; i < classement.length; i++) {

                        if (classement[i].points < points || classement[i].winners < winners || classement[i].scores < scores) {
                            rang = compteur;
                        }

                        rangs.push({ rang: rang, id: classement[i].id, pseudonyme: classement[i].pseudonyme, points: classement[i].points, winners: classement[i].winners, scores: classement[i].scores, path : classement[i].path });

                        points = classement[i].points;
                        winners = classement[i].winners;
                        scores = classement[i].scores;
                        
                        compteur++;
                    }                  
                    calendarCtrl.groups.push({id : groups[index].id, nom : groups[index].nom, classement : rangs});
                }
                
                if( calendarCtrl.users ) {
                    for(var index=0; index < calendarCtrl.users.length; index++){
                        delete calendarCtrl.users[index].check;
                    }
                }
                
                calendarCtrl.affiche = [];
                 
             });
        }
    };

    // Afficher la liste des utilisateurs
    calendarCtrl.afficheListe = function(id){
        calendarCtrl.affiche[id] = true;
    };
    
    calendarCtrl.isAffichable = function(id){
      return calendarCtrl.affiche[id];
    };

    calendarCtrl.isMySelf = function (id) {
        return authentificationService.getUser().id == id;
    };

    // Algorithme de comparaison
    calendarCtrl.compare = function (rang1, rang2) {

        // On compare le nombre de points
        if (parseInt(rang1.points) < parseInt(rang2.points)) {
            return false;
        }
        if (parseInt(rang1.points) == parseInt(rang2.points)) {
            // On compare le nombre de victoires
            if (parseInt(rang1.winners) < parseInt(rang2.winners)) {
                return false;
            }
            if (parseInt(rang1.winners) == parseInt(rang2.winners)) {
                // On compare le nombre de victoires
                if (rang1.scores < rang2.scores) {
                    return false;
                }
            }
        }
        return true;
    }; 

    // Algorithme de tri
    calendarCtrl.tri = function (rangs, f) {
        for (var i = 0 ; i < rangs.length; i++) {
            // le tableau est tri� de 0 � i-1
            // La boucle interne recherche le maximum  
            // de i+1 � la fin du tableau. 
            for (var j = i + 1; j < rangs.length; j++) {
                if (f(rangs[j], rangs[i])) {
                    var temp = rangs[j];
                    rangs[j] = rangs[i];
                    rangs[i] = temp;
                }
            }
        }
        return rangs;
    };

    // On r�cup�re la liste des utilisateurs
    calendarCtrl.getListeUtilisateur = function(){
        if (calendarCtrl.isConnected()) {
            calendarService.getUsers().then(function (users) {
                calendarCtrl.users = users;
                
                    // Mise à jour des groupes
                    calendarCtrl.majListeGroupes();
                    
                    calendarCtrl.loading = false;
                
            });
        }
    }

    // On r�cup�re le classement
    calendarCtrl.getClassement = function(){
        
        if (calendarCtrl.isConnected()) {

            calendarCtrl.rangs = [];
            calendarService.getRangs().then(function (rangs) {
                var classement = calendarCtrl.tri(rangs, calendarCtrl.compare);

                    // On ajoute le rang
                    var rang = 1;
                    var compteur = 1;
                    var points = classement[0].points;
                    var winners = classement[0].winners;
                    var scores = classement[0].scores;

                    for (var i = 0; i < classement.length; i++) {

                        if (classement[i].points < points || classement[i].winners < winners || classement[i].scores < scores) {
                            rang = compteur;
                        }

                        calendarCtrl.rangs.push({ rang: rang, id: classement[i].id, pseudonyme: classement[i].pseudonyme, points: classement[i].points, winners: classement[i].winners, scores: classement[i].scores, path : classement[i].path });

                        points = classement[i].points;
                        winners = classement[i].winners;
                        scores = classement[i].scores;
                        compteur++;

                    }
                    
                    calendarCtrl.getListeUtilisateur();

            });
        }
    }

    // On r�cup�re les pronostics
    calendarCtrl.getPronostic = function(){
        if (calendarCtrl.isConnected()) {
            calendarService.getListPronostics(authentificationService.getUser().id).then(function (pronostics) {
                calendarCtrl.pronostics = pronostics;
                calendarCtrl.checklist = [];
                // Initialisation des check-box
                for(var i=0; i < pronostics.length; i++){
                    for(var j=0; j< pronostics[i].data.length ; j++){
                        if( pronostics[i].data[j].winner == pronostics[i].data[j].homeTeamName){
                            calendarCtrl.checklist[pronostics[i].data[j].idMatch+'-home']=true;
                        }
                        
                        if(pronostics[i].data[j].winner == pronostics[i].data[j].awayTeamName){
                            calendarCtrl.checklist[pronostics[i].data[j].idMatch+'-away']=true;
                        }
                    }
                }
                
                calendarCtrl.getClassement();
                
            });
        }else{
            calendarCtrl.loading = false;
        }
    }
    
     // On r�cup�re la liste des matchs
    calendarService.getListFixtures().then(function (fixtures) {
        calendarCtrl.fixtures = fixtures;
        
        calendarCtrl.getPronostic();
        
    });
    
}]);