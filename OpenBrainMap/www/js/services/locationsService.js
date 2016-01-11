angular.module('starter').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      name : "Washington D.C., USA",
      lat : 38.8951100,
      lng : -77.0363700,
      cat: "produttori"
    },
    {
      name : "London, England",
      lat : 51.500152,
      lng : -0.126236,
      cat: "attivita"
    },
    {
      name : "Paris, France",
      lat : 48.864716,
      lng : 2.349014,
      cat: "mercato"
    },
    {
      name : "Moscow, Russia",
      lat : 55.752121,
      lng : 37.617664,
      cat: "mercato"
    },
    {
      name : "Rio de Janeiro, Brazil",
      lat : -22.970722,
      lng : -43.182365,
      cat: "mercato"
    },
    {
      name : "Sydney, Australia",
      lat : -33.865143,
      lng : 151.209900,
      cat: "produttore"
    }

  ];

  return locationsObj;

}]);