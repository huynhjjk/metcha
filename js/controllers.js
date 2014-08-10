app.controller('ChatCtrl', ['$scope', function($scope) {
	$scope.user = 'User' + Math.floor((Math.random() * 1000) + 1);

	$scope.message = "";
	$scope.messageList = [];

	var pn = PUBNUB.init({
			publish_key : 'demo',
			subscribe_key : 'demo'
	});

	pn.subscribe({
		channel  : 'test',
		callback : function(text) {
	      $scope.$apply(function(){

	      	var message = {};
	      	message.date = new Date();
	      	message.text = text;

			$scope.messageList.push(message);

			$scope.message = "";

	      });
		}
	});

	$scope.sendMessage = function(text) {
		pn.publish({
			channel : 'test',
			message : text
		});
	}

	$scope.deleteMessage = function(index) {
		$scope.messageList.splice(index, 1);
	}

	$scope.deleteMessages = function() {
		$scope.messageList = [];
	}

}]);