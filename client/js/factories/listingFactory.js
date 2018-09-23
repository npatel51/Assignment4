angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('//localhost:8080/api/listings');
    },
	
	  create: function(listing) {
	  return $http.post('//localhost:8080/api/listings', listing);
    }, 

    delete: function(listing) {
	   /**TODO
        return result of HTTP delete method
       */
      return $http.delete('//localhost:8080/api/listings/'+listing._id,listing);
    }
  };

  return methods;
});
