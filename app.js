 angular.module("sampleApp", ["firebase"])
        .factory("chatMessages", ["$firebaseArray",
          function($firebaseArray) {
            var randomRoomId = Math.round(Math.random() * 100000000);
            var ref = new Firebase("https://chat-room-12fd4.firebaseio.com/" + randomRoomId);
            return $firebaseArray(ref);
          }
        ])
        .controller("ChatCtrl", ["$scope", "chatMessages",
          function($scope, chatMessages) {
            $scope.user = "Guest " + Math.round(Math.random() * 100);


            $scope.messages = chatMessages;


            $scope.addMessage = function() {
              $scope.messages.$add({
                from: $scope.user,
                content: $scope.message
              });

              $scope.message = "";
            };


            $scope.messages.$loaded(function() {
              if ($scope.messages.length === 0) {
                $scope.messages.$add({
                  from: "Sudipta",
                  content: "Hello world!"
                });
              }
            });
          }
        ]);