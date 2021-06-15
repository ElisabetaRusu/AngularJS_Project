'use strict';

angular.module('blogDetail').
	component('blogDetail', {		
		templateUrl: '/templates/blog-detail.html',
		controller: function(Post, $http, $location, $routeParams, $scope){		
			
			Post.query(function(data){
				$scope.notFound = true				
				$scope.comments = []
				angular.forEach(data, function(post){
					if(post.id == $routeParams.id){
						$scope.notFound = false
						$scope.post = post
						if (post.comments) {
							$scope.comments = post.comments
						}
						resetReply()
					}
				})
			})

			$scope.deleteComment = function(comment) {
				$scope.$apply(
					$scope.comments.splice(comment, 1)
				)
				// someResource.$delete()
			}

			$scope.addReply = function() {
				console.log($scope.reply)
				$scope.comments.push($scope.reply)
				resetReply()
			}

			function resetReply(){
				$scope.reply= {
						"id": $scope.comments.length +1,
						"text": "",
				}
			}

			if($scope.notFound){
				console.log("Not found ")
				//change location
				$location.path("/")
			}				
			//$http.get("/json/posts.json").then(successCallback, errorCallback);

			// function successCallback(response, status, config, statusText){
			// 	$scope.notFound = true				
			// 	var blogItems = response.data
			// 	$scope.posts = blogItems				
			// 	angular.forEach(blogItems, function(post){
			// 		if(post.id == $routeParams.id){
			// 			$scope.notFound = false
			// 			$scope.post = post
			// 		}
			// 	})
			// }

			// function errorCallback(response, status, config, statusText){
			// 	console.log(response)
			// }

			

			// var blogItems = [
			// 	{title: "Some Title", id: 1, description: "This is a book", publishDate:"2020-09-11"},
			// 	 {title: "Title", id: 2, description: "This is a book"},
			// 	  {title: "Tea", id: 3, description: "This is a book"},
			// 	   {title: "Lite", id: 4, description: "This is a book"},

			// ]

			// //console.log($routeParams)		
			// $scope.title="Blog " + $routeParams.id
			// $scope.notFound = true
			// angular.forEach(blogItems, function(post){
			// 	if(post.id == $routeParams.id){
			// 		$scope.notFound = false
			// 		$scope.post = post
			// 	}
			// })
		}
});

	