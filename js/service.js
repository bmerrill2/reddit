var app = angular.module('reddit')

app.service('FirebaseService', function ($http, $q) {

  this.getData = function () {
    var defer = $q.defer();
    $http({
      method: "GET",
      url: 'https://devmtn.firebaseio.com/posts.json'
    }).then(function (response) {

      defer.resolve(response.data)
    })
    return defer.promise;

  };



  this.postNew = function (post) {
    console.log("$$$ post $$$", post);
    var guid = function () {
      var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    post.timestamp = Date.now();
    post.comments = [];
    post.karma = 0;
    post.id = guid();

    return $http({
      method: "PUT",
      url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
      data: post
    })
    console.log(post);
  };

  this.vote = function (id, direction, karma) {

    if (direction === 'up') {
      karma++;
    } else if (direction === 'down') {
      karma--;
    }


    return $http({
      method: "PATCH",
      url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
      data: {karma}
    })
  };

  this.comment = function (post, text) {
    var comArray = post.comments
    if (!post.comments) {
      comArray = [];
    }
    var NewComment = function (comment) {
      this.comment = comment;
    }
    if (text) {
      var newCom;
      newCom = new NewComment(text);
      comArray.push(newCom);
      post.comments = comArray;
    }
    post.commentForm = ''
    return $http({
      method: 'PATCH',
      url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
      data: {post}
    })
  };

});