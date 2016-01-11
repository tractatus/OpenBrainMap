angular.module('starter').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'LocationsService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      LocationsService,
      InstructionsService
      ) {
	 
	  
	  
	  
	  $scope.tab = 1;
      
      $scope.selectTab = function(setTab){
		  $scope.tab = setTab;
		  console.log("TABBBBBB: "+$scope.tab);
		  
		  switch ($scope.tab) {
		    case 1:
		        $scope.goToDefault();
		        break;
		    case 2:
		        $scope.goToRel();
		        break;
		    case 3:
		        $scope.goToTag();
		        break;
		    case 4:
		        $scope.goToMark();
		        break;
		    
		    default:
		        $scope.goToDefault();
		        break;
		}
	  }

      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;
        $scope.newLocation;        

        $scope.map;

 
                       
        /*$scope.toggleLayer = function(type)
            {
                $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
            }
        */

            

        if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Add Locations',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
            });

        }

        $scope.map = {
        		
        		layer: {
                    tileLayer: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}'
                }, 
                markers : {},
            	center: {},  
                maxZoom: 18,
                zoomControlPosition: 'topleft',
		        events: {
		        	map: {
		               enable: ['context'],
		               logic: 'emit'
		         	}
		         }
        };

        $scope.goToDefault();

      });

      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.name = "";
      };

      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      /**
       * Detect user long-pressing on map to add new location
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });

      $scope.saveLocation = function() {
        LocationsService.savedLocations.push($scope.newLocation);
        $scope.modal.hide();
        $scope.goTo(LocationsService.savedLocations.length - 1);
      };
      
      /*
       * detect click on marker
       */
      $scope.$on('leafletDirectiveMarker.click', function(e, args) {
          // Args will contain the marker name and other relevant information
          console.log("Leaflet Click");
          
      });
      
      /*
       * detect popup open
       */
      $scope.$on('leafletDirectiveMarker.popupopen', function(e, args) {
          // Args will contain the marker name and other relevant information
          console.log("Leaflet Popup Open");
          for(prop in e) console.log(" e... "+prop);
          for(prop in args) console.log(" a..."+prop);
      });
      
      /*
       * detect popup close
       */
      $scope.$on('leafletDirectiveMarker.popupclose', function(e, args) {
          // Args will contain the marker name and other relevant information
          console.log("Leaflet Popup Close");
          for(prop in e) console.log(" e... "+prop);
          for(prop in args) console.log(" a..."+prop);
      });

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      $scope.goToDefault = function() {

    	//define tilelayer
      	$scope.map.layer.tileLayer = 'https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png'
;

        //define center
        $scope.locate();

        //add markers
        //$scope.addMarkers(); 
        

      };
      
      $scope.goToMark = function() {

      	//define tilelayer
      	$scope.map.layer.tileLayer =  'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token=<pk.eyJ1Ijoia29jbGlmZSIsImEiOiJYcDhhc3I0In0.eXVQLUntnP9yHu8q3pMDHQ>';

          //define center
          $scope.map.center;

          //add markers
          $scope.addMarkers(); 
          

        };
        
        $scope.goToRel = function() {

          	//define tilelayer
        	$scope.map.layer.tileLayer =  'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

              //define center
              $scope.locate();

              //add markers
              $scope.addMarkers(); 
              

        };
        
        $scope.goToTag = function() {

          	//define tilelayer
        	$scope.map.layer.tileLayer =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

            //define center
            $scope.locate();

            //add markers
            $scope.addMarkers(); 

        };

      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 15;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };
      
      
      /*
       * return the list of markers
       */
      $scope.addMarkers = function(){    	  
      
    		for(var i = 0; i<$scope.locations.length; i++){
                $scope.map.markers['marker_' + i] = {
                    lat: $scope.locations[i].lat,
                    lng: $scope.locations[i].lng,
                    name: $scope.locations[i].name,
                    message: 'AAAA',
                    focus: false,
                    draggable: false,
                    //message: '<span ng-click="$scope.map.markers[marker_'+i+']=true"></span>'
                };
    		}
    	
    	};
    	


      


    }]);