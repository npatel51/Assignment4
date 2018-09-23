angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/listings');
    },
	
	  create: function(listing) {
	  return $http.post('/api/listings', listing);
    }, 

    delete: function(listing) {
	   /**TODO
        return result of HTTP delete method
       */
      return $http.delete('/api/listings/'+listing._id,listing);
    }
  };

  return methods;
});
