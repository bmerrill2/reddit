var app = angular.module('reddit')

app.controller('PostsController', function ($scope, FirebaseService) {

  $scope.getPosts = function () {
    FirebaseService.getData().then(function (response) {
      $scope.posts = response;
    })
  }

  $scope.getPosts();

  $scope.addPost = function () {
    FirebaseService.postNew($scope.newPost).then(function (results) {
      console.log(results)
      $scope.getPosts()
    })
  };
  
  $scope.vote = function(id, direction, karma) {
    FirebaseService.vote(id, direction, karma).then(function() {
      $scope.getPosts();
    });
  };
  
  $scope.submitComment = function (id, text) {
    FirebaseService.comment(id, text).then(function() {
      $scope.getPosts();
    });
  };

});