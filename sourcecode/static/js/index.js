(function(){

 /* var app = angular.module('timesheet', ["ngAnimate"]);

  app.controller('FormController', function($scope, $timeout) {

    $scope.ele = {
      email: "",
      time: {
        hours: "",
        mins: ""
      },
      msg: "",
      selectTypes: [
        "Time working on visual effects for movie"
      ]
    };

    var defaultForm = angular.copy($scope.ele);

    $scope.clearInfo = function() {

      $scope.ele = angular.copy(defaultForm);
      $scope.formTimesheet.$setPristine();
      $scope.selectedItems = '';
      $scope.newType = '';

      document.getElementsByName('formTimesheet')[0].reset();
      var elements = document.getElementById("dropDown").options;
      for (var i = 0; i < elements.length; i++) {
        elements[i].selected = false;
      }

    };

    $scope.createNew = function(newType) {

      if (newType) {
        if (newType.length !== 0) {
          $scope.ele.selectTypes.push(newType);
        }

        $scope.newType = '';
      }

    };

    $scope.saveForm = function() {
      $scope.clicked = true;

      $timeout(function() {
        $scope.success = true;
      }, 1400);

    };

    $scope.startAgain = function() {

      if ($scope.clicked === true) {
        $scope.clicked = false;
      }

      if ($scope.success === true) {
        $scope.success = false;
      }

      $scope.clearInfo();

    };

  });*/

    var pokemons = {
        common: [

            "pidgey", 
            "spearow", 
            "nidoran-f", 
            "nidoran-m", 
            "rattata", 
            "sentret",
            "oddish", 
            "geodude",  
            "mareep"

        ],

        uncommon: [

            "ekans", 
            "sandshrew", 
            "bellsprout",
            "caterpie", 
            "weedle",
            "paras", 
            "zubat", 
            "venonat", 
            "vulpix", 
            "jigglypuff", 
            "ledyba", 
            "flaafy", 
            "clefairy", 
            "spinarak", 
            "marill", 
            "hoppip", 
            "growlithe", 
            "phanpy",
            "cubone", 
            "poliwag",  
            "eevee", 
            "abra"

        ],

        rare: [

            "beedrill", 
            "butterfree",
            "pidgeotto", 
            "dratini",
            "miltank"

        ],

        flying: "beedrill butterfree pidgeotto ledyba zubat"

    };

    function getY( pokemon ) {
        if( pokemons.flying.indexOf( pokemon ) >= 0 ) {
            return (( Math.random() * 3 ) + 11).toFixed(2);
        } else {
           return  (( Math.random() * 3 ) + 9).toFixed(2);
        }
    }

    function getZ( y ) {
        return Math.floor((20 - y) * 100);
    }

    function randomPokemon( type ) {
        return pokemons[type][ Math.floor( Math.random() * pokemons[type].length ) ];
    }

    function makePokemon( type ) {

        var xDelay = ( type === "common" ) ? 0 : ( type === "uncommon" ) ? 0.4 : 0.8;
        var delay = "-webkit-animation-delay: " + ( Math.random() * 1.7 + xDelay ).toFixed(3) + "s;";
        var pokemon = randomPokemon( type );
        var bottom = getY( pokemon );
        var y = "bottom: "+ bottom +"%;";
        var z = "z-index: "+ getZ( bottom ) + ";";
        var style = "style='"+delay+" "+y+" "+z+"'";

        return "" + 
            "<i class='sprite pokemon move " + pokemon + "' "+ style + ">" + 
                "<i style='"+ delay + "'></i>" + 
            "</i>";
    }

    var commons = Math.floor( Math.random() * 25 ) + 25;
    var uncommons = Math.floor( Math.random() * 5 ) + 8;
    var rares = 4;

    var container = document.querySelectorAll(".pokemons")[0];
    var horde = "";

    for ( i = 0 ; i < commons ; i++ ) {
        horde += makePokemon( "common" );
    }

    for ( i = 0 ; i < uncommons ; i++ ) {
        horde += makePokemon( "uncommon" );
    }

    for ( i = 0 ; i < rares ; i++ ) {
        horde += makePokemon( "rare" );
    }

    container.innerHTML = horde;



    var battle = document.querySelector("#battle");
    var pallet = document.querySelector("#pallet");
	
    pallet.volume = 0.3;
    battle.volume = 0.3;
    pallet.play();
    
    setTimeout(function() {
        pallet.pause();
    },8000);

    setTimeout(function() {
        battle.play();
    },7000);

    setTimeout(function() {
        battle.pause();
    },17000);

    setTimeout(function() {
        pallet.play();
    },17000);

    setTimeout(function() {
        pallet.pause();
    },30000);


}());
