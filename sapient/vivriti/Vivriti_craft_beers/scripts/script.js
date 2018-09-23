
var app = angular.module("instantSearch", []);

// Create the instant search filter

app.filter('searchFor', function(){

	
   
	return function(arr, searchString){


		if(!searchString){
			return arr;
		}
       
		var result = [];
        console.dir("search string"+ searchString);
        
		searchString = searchString.toLowerCase();
        
        
        
		angular.forEach(arr, function(item){
           // console.dir("title"+ item.title);
			 if(item.name.toString().toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			 }
           
		});

		return result;
	};

});
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

// The controller

function InstantSearchController($scope, $http){
    var title_name;
    var style;
    var ounces;
    var id;
    var abv;
    var ibu;
    $scope.hideMe = true;
    $scope.doSorting = false;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    
    
    

	
    $http.get("http://starlord.hackerearth.com/beercraft")
    .then(function(response) {
        $scope.content = response.data;
       // $scope.items =$scope.content;
       // console.dir("data is"+ $scope.items  );
    }, function(response) {
        $scope.content = "Something went wrong";
    });
    
    

    $scope.select = function(index) {
        $scope.hideMe=false;
        $scope.selected = index; 
        $scope.title_name=$scope.content[index].name;
        $scope.style=$scope.content[index].style;
        $scope.ounces=$scope.content[index].ounces;
        $scope.id=$scope.content[index].id;
        $scope.abv=$scope.content[index].abv;
        $scope.ibu=$scope.content[index].ibu;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        
 

     };

    $scope.sorted = function(){
     $scope.doSorting = $scope.sortScore;
     if($scope.doSorting)
     {
         $scope.doSorting = 'abv';
     }
     else
     {
         $scope.doSorting = '';
     }
    
    }
    
   
}
