
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
			 if(item.title.toString().toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			 }
           
		});

		return result;
	};

});

// The controller

function InstantSearchController($scope, $http){
    var title_name;
    var platform_name;
    var release_year_date;
    var genre_name;
    var editors_choice;
    var score;
    $scope.hideMe = true;
    $scope.doSorting = false;
    

	
    $http.get("http://starlord.hackerearth.com/gamesext")
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
        $scope.title_name=$scope.content[index].title;
        $scope.platform_name=$scope.content[index].platform;
        $scope.release_year_date=$scope.content[index].release_year;
        $scope.genre_name=$scope.content[index].genre;
        $scope.editors_choice=$scope.content[index].editors_choice;
        $scope.score=$scope.content[index].score;
 

     };

    $scope.sorted = function(){
     $scope.doSorting = $scope.sortScore;
     if($scope.doSorting)
     {
         $scope.doSorting = 'score';
     }
     else
     {
         $scope.doSorting = '';
     }
    
    }
}
