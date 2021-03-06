testPortalApp.controller('baQuizCtrl', function($scope, $window, $http) {

	$scope.index = 0;

	$scope.anwser = [];

	$scope.quizContent = [];

	$scope.fileOwner = JSON.parse($window.sessionStorage.getItem('authenticatedUser')).name;

	$scope.getQuizSession = function() {

		$http.get('/getBaQuizSession/' + $scope.session).success(function(res) {
			
			$scope.lists = res;
			$scope.length = res.length;

			//Set the state
			$scope.questions = $scope.lists[$scope.index];

		}).error(function(req, res) {console.log(err)});
	}

	$scope.incrementIndex = function() {

		//Get quiz content
		$scope.quizContent[$scope.index] = {
			title: $scope.lists[$scope.index].question,
			anwser: $scope.anwser[$scope.index]
		}

		$scope.index ++;

		//Set the state
		$scope.questions = $scope.lists[$scope.index];
		
	}

	$scope.decrementIndex = function() {
		$scope.index --;

		//Set the state
		$scope.questions = $scope.lists[$scope.index];
				
	}

	$scope.previewQuiz = function() {

		let username = JSON.parse($window.sessionStorage.getItem('authenticatedUser')).name;

		let fileDetail = {
			username: username,
			session: $scope.session,
			quizContent: $scope.quizContent
		}

		//Get quiz content
		$scope.quizContent[$scope.index] = {
			title: $scope.lists[$scope.index].question,
			anwser: $scope.anwser[$scope.index]
		}

		$http.post('/generateBaQuizPDF', {fileDetail: fileDetail}).success(function(res) {

			$scope.fileName = res.fileName;
			$scope.filePath = res.filePath;

			$('#previewFileModal').modal();			

		}).error(function(err) {console.log(err)});
	}

	$scope.submitQuiz = function() {

		let email = JSON.parse($window.sessionStorage.getItem('authenticatedUser')).email;

		let submitInfo = {
			email: email,
			session: $scope.session,
			fileName: $scope.fileName,
			filePath: $scope.filePath
		}

		$http.post('/s3/submitBAQuiz', submitInfo).success(function(res) {
			
			$('#submitFileModal').modal();

			//Change test status
			$scope.completeTest();
			
		}).error(function(err) {console.log(err)});
	}

	$scope.completeTest = function() {

		let email = JSON.parse($window.sessionStorage.getItem('authenticatedUser')).email;

		let completeTest = {
			email: email,
			quizSession: $scope.session
		}
		
		$http.put('/completeTestCase', completeTest).success(function(res) {
			
			console.log(res);
			
		}).error(function(err) {console.log(err)});

	}


	$scope.getQuizSession();

});