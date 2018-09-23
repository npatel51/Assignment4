angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.showDetail = false;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      //create a new listing object
      let newListing = {
        code: $scope.buildingCode.toUpperCase(),
        name:$scope.capitalize($scope.buildingName),
        coordinates: {
          latitude:$scope.buildingLatitude,
          longitude:$scope.buildingLongitude
        },
        address:$scope.capitalize($scope.buildingAddress)
      };  

      Listings.create(newListing).then(function(response){
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      },function(error){
        console.log('Unable to create add new listing:', error);
      });
      
    };

    $scope.capitalize = function(string){
      let strs = string.toLowerCase().split(' ');
      for (let i = 0; i < strs.length; i++) {
        strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].substring(1);     
      }
      return strs.join(' '); 
    }

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete($scope.listings[index]).then(function(response){
         //if delete was succesfull, then redirect to listing.list which retrieves all the listings
         Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      },function(error){
         console.log('Unable to remove listing:',error);
      });
    
    };

    $scope.showDetails = function(e,index) {
      // validate whether or not if this element was clicked 
      if( e.target == e.currentTarget){
        $scope.showDetail = true;
        $scope.detailedInfo = $scope.listings[index];
      }
    };
  }
]);