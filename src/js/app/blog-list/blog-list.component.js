'use strict';

angular.module('blogList').
	component('blogList', {
		//template: "<div class=''><h1 class=' new-class'>{{ title }} </h1><button ng-click='someClickTest()'>Click me!</button></div>",
		templateUrl: '/templates/blog-list.html',
		controller: function(Post, $location, $routeParams, $rootScope, $scope){
			console.log($location.search())
			var q = $location.search().q
			console.log(q)
			if(q) {
				$scope.query = q
				$scope.searchQuery = true
			}

			$scope.order = '-publishDate'
			$scope.goToItem = function(post){				
				$rootScope.$apply(function(){
					$location.path("/blog/" + post.id )
				})

			}
			$scope.changeCols = function(number){ 
				if (angular.isNumber(number)){
					$scope.numCols = number
				} else {
					$scope.numCols = 2
				}

				setupCol($scope.items, $scope.numCols)
			}

			$scope.loadingQuery = false
			$scope.$watch(function(){
				//console.log($scope.query)
				if($scope.query){
					$scope.loadingQuery = true
					$scope.cssClass = 'col-sm-12'
					if ($scope.query != q) {
						$scope.searchQuery = false;
					}
				} else{			
					if($scope.loadingQuery){
						setupCol($scope.items, 2)
						$scope.loadingQuery = false
					}					
				}
			})

			function setupCol(data, number){
				if(angular.isNumber(number)){
					$scope.numCols = number
				} else {
					$scope.numCols = 2
				}					
				$scope.cssClass = 'col-sm-' + (12/$scope.numCols)
				$scope.items = data
				$scope.colItems = chunkArrayInGroups(data, $scope.numCols)
			}			
			Post.query(function(data){
					//console.log(data)
					// var numCols = 4
					// $scope.cssClass = 'col-sm-' + (12/numCols)
					// $scope.items = data
					// $scope.colItems = chunkArrayInGroups(data, 3)
					setupCol(data, 2)
				}, function(errorData){

			});

			function chunkArrayInGroups(array, unit) {
				var results = [],
				length = Math.ceil(array.length / unit);

				for(var i=0; i < length; i++) {
					results.push(array.slice(i * unit, (i + 1) * unit));
				}
				return results;
			}


			// console.log($routeParams)

			// Post.query(function(data){
			// 	$scope.notFound = true
			// 	angular.forEach(data, function(post){
			// 		if(post.id == $routeParams.id){
			// 			$scope.notFound = false
			// 			$scope.post = post
			// 		}
			// 	})
			// })


			// var blogItems = [
			// 	{title: "Some Title", id: 1, description: "This is a book", publishDate:"2020-09-11"},
			// 	 {title: "Title", id: 2, description: "This is a book"},
			// 	  {title: "Tea", id: 3, description: "This is a book"},
			// 	   {title: "Lite", id: 4, description: "This is a book"},

			// ]

			

			// $scope.title= 'Hi there'
			// $scope.clicks =0
			// $scope.someClickTest= function(){
			// console.log("clicked")			
			// $scope.clicks +=1
			// $scope.title = 'Clicked ' + $scope.clicks + ' times'
			// }
		}
	});

	// controller('BlogListController', function($scope){
	// 	console.log("hello")
	// 	$scope.title= 'Hi there'
	// 	$scope.clicks =0
	// 	$scope.someClickTest= function(){
	// 		console.log("clicked")
			
	// 		$scope.clicks +=1
	// 		$scope.title = 'Clicked ' + $scope.clicks + ' times'
	// 	}
	// });
	//component('blogList');